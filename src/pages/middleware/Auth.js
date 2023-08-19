import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getLocalStorage } from '../../utils/getToken';
import { login } from '../../store/authSlice';

const Auth = () => {
  const token = getLocalStorage('user');
  const dispatch = useDispatch();

  if (token) {
    dispatch(login({ isLoggedIn: true, user: token }));
  }

  const { isLoggedIn } = useSelector((state) => {
    return state.login;
  });

  return (
    <div>
      {!isLoggedIn && <Navigate to='/login' replace={true} />}
      {isLoggedIn && <Outlet />}
    </div>
  );
};

export default Auth;
