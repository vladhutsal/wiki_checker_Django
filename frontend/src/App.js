import React from 'react';

import Navbar from './components/Navbar';
import ParseTextCont from './containers/ParseTextContainer'

import { Switch, Route, Redirect } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <Switch>

        <Route exact path='/'>
          <Redirect to="/add_text" />
        </Route>

        <Route exact path='/add_text'>
          <ParseTextCont />
        </Route>

      </Switch>
    </>
  );
}
