import React from 'react';

import Box from '@material-ui/core/Box';
import AddText from '../components/ParseText/AddText';
import ParsedKeyphrases from '../components/ParseText/ParsedKeyphrases';

import { handleRequest } from '../services/apiHandler';

export default class ParseTextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TEXT_API: 'http://127.0.0.1:8000/api/text',

      keyphrases: []
    }
    this.saveText = this.saveText.bind(this);
  }

  async saveText(text_content) {
    const data = { text_content: text_content };
    const url = `${this.state.TEXT_API}/create/`;

    const resp = await handleRequest('POST', url, data);
    this.setState({
      keyphrases: resp
    })
    console.log(resp);
  }

  render() {
    return (
      <>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          mt={2}>

          <AddText
            TEXT_API={this.state.TEXT_API}
            saveText={this.saveText}
            keyphrases={this.state.keyphrases} />
        </Box>

        <Box mt={4}>
          {this.state.keyphrases.map(kp => (
            <ParsedKeyphrases 
              key={kp}
              kp={kp} />
          ))}
        </Box>
      </>
    );
  }
}
