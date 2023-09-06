import classes from './register.module.css';

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup, toggleSignupLoading } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './RegisterValidation';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const Register = (props) => {

  const { loading, error, errors } = useSelector((state) => state.signup);


  useEffect(() => {
    document.title = props.title;
    
  }, []);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();

  // Input Handlers.

  const handleNameInput = () => {
    const inputErrors = validateName(nameRef.current.value);

    if (inputErrors.name !== null) {
      dispatch(signup({ error: true, errors: inputErrors }));
    }else{
      dispatch(signup({error:false,errors:''}))
    }
  };

  const handleEmailInput = () => {
    const inputErrors = validateEmail(emailRef.current.value);

    if (inputErrors.email !== null) {
      dispatch(signup({ error: true, errors: inputErrors }));
    }else{
      dispatch(signup({error:false,errors:''}))
    }
  };

  const handlePasswordInput = () => {
    const inputErrors = validatePassword(passwordRef.current.value);

    if (inputErrors.password !== null) {
      dispatch(signup({ error: true, errors: inputErrors }));
    }else{
      dispatch(signup({error:false,errors:''}))
    }
  };

  const handleConfirmPasswordInput = () => {
    const inputErrors = validateConfirmPassword(
      confirmPasswordRef.current.value,
      passwordRef.current.value
    );

    if (inputErrors.password !== null) {
      dispatch(signup({ error: true, errors: inputErrors }));
    }
  };

  // Register handler.
  const registerHandler = (event) => {
    event.preventDefault();

    const fetchData = async () => {
      if (
        !nameRef.current.value ||
        !emailRef.current.value ||
        !passwordRef.current.value ||
        !confirmPasswordRef.current.value
      ) {
        dispatch(
          signup({
            error: true,
            errors: { auth: 'Please Enter all the fields' },
          })
        );
        return;
      }
      dispatch(toggleSignupLoading({ loading: true }));
      const response = await fetch('https://authenticator-backend.onrender.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
        }),
      });
      let data = await response.json();
      dispatch(toggleSignupLoading({ loading: false }));
      return data;
    };

    fetchData()
      .then((res) => {
        if (res.status === false) {
          let errMsg;
          try {
            errMsg =
              res.msg.errors[0].name ||
              res.msg.errors[0].email ||
              res.msg.errors[0].password ||
              res.msg.errors[0].confirmPassword ||
              res.msg.errors[0].userAlreadyExists;
            dispatch(
              signup({ error: true, errors: { auth: errMsg || res.msg } })
            );
          } catch {
            dispatch(signup({ error: true, errors: { auth: res.msg } }));
          }
        } else {
          dispatch(
            signup({
              loading: false,
              error: false,
              errors: {},
            })
          );
          navigate('/pending');
        }
      })
      .catch((err) => console.log(err));
  };

  // Navigate to login.
  const accountHandler = (event) => {
    event.preventDefault();
    navigate('/login', { replace: false });
  };

  let isNameError = error && errors.name;
  let isEmailError = error && errors.email;
  let isPasswordError = error && errors.password;
  let isConfirmPasswordError = error && errors.confirmPassword;
  let isAuthError = error && errors.auth;
  console.log('Render?')

  return (
    <div className={classes.auth_form_container}>
      <h2>Register</h2>
      <form className={classes.register_form}>
        <label htmlFor='name'>Name</label>
        <input
          onChange={handleNameInput}
          ref={nameRef}
          type='text'
          placeholder='Name'
          id='name'
          name='name'
        />
        {isNameError && (
          <span className={classes.error_text}>{errors.name}</span>
        )}
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
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          onChange={handleConfirmPasswordInput}
          ref={confirmPasswordRef}
          type='password'
          placeholder='Re-Enter the Password'
          id='confirmPassword'
          name='confrimPassword'
        />
        {isConfirmPasswordError && (
          <span className={classes.error_text}>{errors.confirmPassword}</span>
        )}
        <button className={classes.signUp} onClick={registerHandler}>
          {!loading && 'Sign Up'} {loading && <LoadingSpinner />}
        </button>
      </form>
      {isAuthError && <span className={classes.error_text}>{errors.auth}</span>}
      <button className={classes.link_btn} onClick={accountHandler}>
        Already have an account? Login Here.
      </button>
    </div>
  );
};

export default Register;
