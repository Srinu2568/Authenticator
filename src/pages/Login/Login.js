import classes from './login.module.css';

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from './LoginValidation';

import { setLocalStorage } from '../../utils/getToken';
import { useDispatch, useSelector } from 'react-redux';
import { login, toggleLoading } from '../../store/authSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const Login = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);

  // Store config
  const { user, loading, error, errors, isLoggedIn } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailInput = () => {
    const inputErrors = validateEmail(emailRef.current.value);

    if (inputErrors.email !== null) {
      dispatch(login({ error: true, errors: inputErrors }));
    }else{
      dispatch(login({error:false,errors:''}))
    }
  };

  const handlePasswordInput = () => {
    const inputErrors = validatePassword(passwordRef.current.value);

    if (inputErrors.password !== null) {
      dispatch(login({ error: true, errors: inputErrors }));
    }else{
      dispatch(login({error:false,errors:''}))
    }
  };

  // Login button
  const loginHandler = (event) => {
    event.preventDefault();

    const fetchData = async () => {
      if (!emailRef.current.value || !passwordRef.current.value) {
        dispatch(
          login({
            error: true,
            errors: { auth: 'Please Enter all the fields' },
          })
        );
        return;
      }
      dispatch(toggleLoading({ loading: true }));
      const response = await fetch('https://authenticator-backend.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      let data = await response.json();
      dispatch(toggleLoading({ loading: false }));
      return data;
    };

    fetchData()
      .then((res) => {
        if (res.status === false) {
          let errMsg;
          try {
            errMsg = res.msg.errors[0].email || res.msg.errors[0].password;
            dispatch(
              login({ error: true, errors: { auth: errMsg || res.msg } })
            );
          } catch {
            dispatch(login({ error: true, errors: { auth: res.msg } }));
          }
        } else {
          const user = setLocalStorage('user', res.token);
          dispatch(
            login({
              user: user,
              loading: false,
              error: false,
              errors: {},
              isLoggedIn: true,
            })
          );
          navigate('/dashboard');
        }
      })
      .catch((err) => console.log(err));
  };

  const accountHandler = (event) => {
    event.preventDefault();
    navigate('/register', { replace: false });
  };

  let isEmailError = error && errors.email;
  let isPasswordError = error && errors.password;
  let isAuthError = error && errors.auth;

  let authErrors = errors.auth;

  return (
    <div className={classes.auth_form_container}>
      <h2>Login</h2>

      <form className={classes.login_form}>
        <label htmlFor='email'>Email</label>
        <input
          onChange={handleEmailInput}
          ref={emailRef}
          type='email'
          placeholder='Email'
          id='email'
          name='email'
        />
        {isEmailError && (
          <span className={classes.error_text}>{errors.email}</span>
        )}
        <label htmlFor='password'>Password</label>
        <input
          onChange={handlePasswordInput}
          ref={passwordRef}
          type='password'
          placeholder='Password'
          id='password'
          name='password'
        />
        {isPasswordError && (
          <span className={classes.error_text}>{errors.password}</span>
        )}
        <button className={classes.login} onClick={loginHandler}>
          {!loading && 'Log In'} {loading && <LoadingSpinner />}
        </button>
        {isAuthError && (
          <span className={classes.error_text}>{authErrors}</span>
        )}
      </form>
      <button className={classes.link_btn} onClick={accountHandler}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login;
