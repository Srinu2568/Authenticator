import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../utils/fetchData';
import { setLocalStorage } from '../../utils/getToken';
import { login } from '../../store/authSlice';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const Dashboard = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.login;
  });

  const [email, setEmail] = useState('youremail@domain.com');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData('https://authenticator-backend.onrender.com/api/v1/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
    })
      .then((data) => {
        setIsLoading(false);
        if (data.isJWTExpired || (!data.status && !data.isLoggedIn)) {
          setLocalStorage('user', null);
          dispatch(login({ isLoggedIn: false, user: null }));
          // return <Navigate to='/login' replace={true} />;
          navigate('/login', { replace: true });
        } else {
          setEmail(data.reqData.email);
        }
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && `Your Email: ${email}`}
    </>
  );
};

export default Dashboard;
