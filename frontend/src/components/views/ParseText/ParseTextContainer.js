import React from 'react';

import ParsedKeyphrases from './ParsedList';
import { handleRequest } from '../../../services/apiHandler';
import TextError from '../../Errors/AddTextError';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AddText from './AddText';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class ParseTextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyphrases: [],

      loading: false,
      showServerErr: false,
      serverMsg: ''
    };
    this.saveText = this.saveText.bind(this);
    this.toogleLoading = this.toogleLoading.bind(this);
    this.toogleShowErr = this.toogleShowErr.bind(this);
  }

  async saveText(text_content) {
    const data = { text_content: text_content };
    const url = this.props.TEXT_API_URL;
    try {
      const resp = await handleRequest('POST', url, data);
      this.toogleLoading(false);
      this.setState({ keyphrases: resp.data, serverMsg: resp.msg });
    } catch (error) {
      this.toogleLoading(false);
      this.setState({ serverMsg: 'Server error' })
    };
    this.toogleShowErr(true);
  }

  toogleShowErr(toogle) {
    this.setState({ showServerErr: toogle })
  }

  toogleLoading(toogle) {
    this.setState({ loading: toogle });
  }

  render() {
    const isLoading = this.state.loading;
    const serverErr = this.state.showServerErr;
    const serverMsg = this.state.serverMsg;
    const keyphrases = this.state.keyphrases;

    return (
      <Container align='center'>
        <AddText
          saveText={this.saveText}
          keyphrases={this.state.keyphrases}
          toogleLoading={this.toogleLoading}
          toogleShowErr={this.toogleShowErr}
          showErr={this.state.showServerErr}
          updateKeys={this.props.updateKeys}
        />

        {isLoading &&
          <LinearProgress
            style={{
              marginTop: '8px',
              width: '800px'
            }} />
        }

        {serverErr && serverMsg.length > 0 &&
          <TextError serverMsg={serverMsg} />
        }

        <Box>
          {keyphrases &&
            keyphrases.map(kp => (
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
