import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const ConfirmAccount = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);

  let { confirmToken } = useParams();
  let [searchParams] = useSearchParams();
  let email = searchParams.get('m');

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(
      `https://authenticator-backend.onrender.com/api/v1/auth/${confirmToken}?m=${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let data = await response.json();
    return data;
  };

  fetchData()
    .then((res) => {
      setLoading(false);
      if (res.status === false) {
        setErrorMsg(res.msg);
      }
    })
    .catch((err) => console.log(err));

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && !errorMsg && (
        <h3>
          {`Your Account has been Verified. Go to `}
          <Link to='/login' replace={true}>
            Login Page
          </Link>
          {` to continue.`}
        </h3>
      )}
      {!loading && errorMsg && <h3>{errorMsg}</h3>}
    </>
  );
};

export default ConfirmAccount;
