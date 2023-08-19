import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AccountPending = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <h3>
      Please confirm the email by clicking on the link which was sent to your
      registered Email, Later click on{' '}
      {
        <Link to='/login' replace={true}>
          Login
        </Link>
      }{' '}
      to continue!
    </h3>
  );
};

export default AccountPending;
