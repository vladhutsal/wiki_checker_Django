import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AddText from './AddText';
import ParsedKeyphrases from './ParsedList';

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
    const url = this.props.TEXT_API_URL;

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
          saveText={this.saveText}
          keyphrases={this.state.keyphrases} 
          toogleLoading={this.toogleLoading} 
          isLoading={this.state.loading}
          updateKeys={this.props.updateKeys}
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
