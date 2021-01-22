import React from 'react';
import Navbar from './components/Navbar';

import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: []
    }
    this.saveToDB = this.saveToDB.bind(this)
  }

  async saveToDB() {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        text_content: 'this is small test text 8'
      }),
    };
    const resp = await fetch('http://127.0.0.1:8000', request);
    const respContent = await resp.json();
    this.setState({
      loadedData: respContent
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.saveToDB}>Create</button>
        <p>{ this.state.loadedData.text }</p>
        <p>{ this.state.loadedData.id }</p>
      </div>
    );
  }
}
