import React, { Suspense } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './store/store';
// import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import ConfirmAccount from './pages/ConfirmAccount/ConfirmAccount';
import Auth from './pages/middleware/Auth';
// import Dashboard from './pages/Dashboard/dashboard';
// import AccountPending from './pages/AccountPending/AccountPending';
import Loader from './components/UI/Loader/Loader';

// Lazy load imports
const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const ConfirmAccount = React.lazy(() =>
  import('./pages/ConfirmAccount/ConfirmAccount')
);
const Dashboard = React.lazy(() => import('./pages/Dashboard/dashboard'));
const AccountPending = React.lazy(() =>
  import('./pages/AccountPending/AccountPending')
);

function App() {
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div className='App'>
            <div className='centered'>
              <Loader></Loader>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Home title='Authenticator' />}>
            <Route path='/login' element={<Login title='Login' />} />
            <Route path='/register' element={<Register title='Register' />} />
            <Route
              path='/pending'
              element={<AccountPending title='Pending' />}
            />
            <Route
              path='/confirmaccount/:confirmToken'
              element={<ConfirmAccount title='Account Confirmation' />}
            />
            <Route path='/' element={<Auth />}>
              <Route
                path='/dashboard'
                element={<Dashboard title='Dashboard' />}
              />
            </Route>
            <Route path='*' element={<h3>404 Not Found</h3>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;

