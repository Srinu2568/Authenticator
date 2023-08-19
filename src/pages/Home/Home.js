import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Home = (props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div className='App'>
      {pathname === '/' && <Link to='/dashboard'>Dashboard</Link>}
      <Outlet />
    </div>
  );
};

export default Home;
