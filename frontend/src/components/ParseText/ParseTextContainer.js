import React from 'react';

import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddText from './AddText';
import ParsedKeyphrases from './ParsedKeyphrases';

import { handleRequest } from '../../services/apiHandler';

export default class ParseTextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyphrases: []
    }
    this.saveText = this.saveText.bind(this);
  }

  async saveText(text_content) {
    const data = { text_content: text_content };
    const url = `${this.props.TEXT_API}/create/`;

    const resp = await handleRequest('POST', url, data);
    this.setState({
      keyphrases: resp
    })
    console.log(resp);
  }

  render() {
    return (
      <Container>

        <AddText
          TEXT_API={this.state.TEXT_API}
          saveText={this.saveText}
          keyphrases={this.state.keyphrases} />

        <Box>
          {this.state.keyphrases.map(kp => (
            <ParsedKeyphrases
              key={kp.id}
              kp_content={kp.kp_content}
              kp_link={kp.wiki_link}
              kp_dsmb={kp.disambiguation}
              kp_score={kp.score} />
          ))}
        </Box>
      </Container>
    );
  }
}
