import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AddText from './AddTextComponent';
import ParsedKeyphrases from './ParsedListComponent';

import { handleRequest } from '../../services/apiHandler';

export default class ParseTextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyphrases: [],
      loading: false
    }
    this.saveText = this.saveText.bind(this);
    this.toogleLoading = this.toogleLoading.bind(this);
  }

  async saveText(text_content) {
    const data = { text_content: text_content };
    const url = `${this.props.TEXT_API}/create/`;

    const resp = await handleRequest('POST', url, data);
    this.toogleLoading(false);
    this.setState({
      keyphrases: resp
    });
  }

  toogleLoading(toogle) {
    this.setState({
      loading: toogle
    });
  }

  render() {
    return (
      <Container>
        <AddText
          TEXT_API={this.state.TEXT_API}
          saveText={this.saveText}
          keyphrases={this.state.keyphrases} 
          toogleLoading={this.toogleLoading} 
          isLoading={this.state.loading} 
        />

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
