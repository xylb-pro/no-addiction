import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { initState } from './store/timers/timersActions';
import { getTokenFromLocalstorage } from './store/users/usersActions';
import { RootState } from './store/rootReducer';

import { useRoutes } from './routes';
import { PageHeader } from './containers/PageHeader';

export default function App() {
  const isAuth = useSelector((state: RootState) => state.users.isAuth);
  const routes = useRoutes(isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenFromLocalstorage());
  }, []);

  //init if is auth
  useEffect(() => {
    if (isAuth) dispatch(initState());
  }, [isAuth]);

  return (
    <div className="root">
      <BrowserRouter>
        {isAuth && <PageHeader />}

        {routes}
      </BrowserRouter>
    </div>
  );
}
