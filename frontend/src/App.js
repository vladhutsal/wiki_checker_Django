import React from 'react';

import Navbar from './components/Navbar';
import ParseTextContainer from './components/views/ParseText/ParseTextContainer';
import KeyphrasesRank from './components/views/KeyphrasesRank';
import TextHistory from './components/views/TextHistory';

import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TEXT_API_URL: 'http://127.0.0.1:8000/api/text',
      KP_API_URL: 'http://127.0.0.1:8000/api/kp/get_all'
    };
  }

  render() {
    return (
      <>
        <Navbar />
        <Switch>

          <Route exact path='/'>
            <Redirect to="/add_text" />
          </Route>

          <Route exact path='/add_text' render={props => (
            <ParseTextContainer {...props}
              TEXT_API_URL={`${this.state.TEXT_API_URL}/create/`}
            />
          )} />

          <Route exact path='/rank' render={props => (
            <KeyphrasesRank {...props}
              KP_API_URL={this.state.KP_API_URL}
            />
          )} />

          <Route exact path='/text_history' render={props => (
            <TextHistory {...props}
              TEXT_API_URL={`${this.state.TEXT_API_URL}/get_all`}
            />
          )} />

        </Switch>
      </>
    );
  }
}
