import React from 'react';

import Navbar from './components/Navbar';
import ParseTextContainer from './components/ParseText/ParseTextContainer';
import KeyphrasesRank from './components/KeyphrasesRank';

import {handleRequest} from './services/apiHandler';

import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TEXT_API_URL: 'http://127.0.0.1:8000/api/text',
      KP_API_URL: 'http://127.0.0.1:8000/api/kp/get_all',
      all_keyphrases: []
    }
  }

  async componentDidMount() {
    const resp = await handleRequest('GET', this.state.KP_API_URL);
    this.setState({
      all_keyphrases: resp
    });
    console.log(this.state.all_keyphrases)
  }

  render() {
    return (
      <>
        <Navbar></Navbar>
        <Switch>

          <Route exact path='/'>
            <Redirect to="/add_text" />
          </Route>

          <Route exact path='/add_text' render={props => (
            <ParseTextContainer {...props}
              TEXT_API={this.state.TEXT_API_URL} />
          )} />

          <Route exact path='/rank' render={props => (
            <KeyphrasesRank {...props} 
              kp_list={this.state.all_keyphrases}/>
          )} />

        </Switch>
      </>
    );
  }
}
