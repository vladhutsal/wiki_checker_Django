import React from 'react';
import Cookies from 'js-cookie'; 
// import Navbar from './components/Navbar';

// import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TEXT_API: 'http://127.0.0.1:8000/api/text',
      text: '',
      id: ''
    }
    this.saveToDB = this.saveToDB.bind(this)
  }

  async saveToDB() {
    const csrftoken = Cookies.get('csrftoken');
    const content = { text_content: 'New data line' };
    const request = {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    };
    const resp = await fetch('http://127.0.0.1:8000/api/text/create/', request);
    const respContent = await resp.json();
    this.setState({
      text: respContent.data.text_content,
      id: respContent.data.id
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.saveToDB}>Create</button>
        <button onClick={this.saveToDB}>Get</button>

        <p>{ this.state.text }</p>
        <p>{ this.state.id }</p>
      </div>
    );
  }
}
