import React from 'react';

export default class TextCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: []
    }
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
    console.log(respContent);
  }

  render() {
    return (
      <div>
        <form>
          
          <button onClick={this.saveToDB}>Create</button>
        </form>
      </div>
    );
  }
}
