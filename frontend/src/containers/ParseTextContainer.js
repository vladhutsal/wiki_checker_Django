import React from 'react';

import Box from '@material-ui/core/Box';
import AddText from '../components/ParseText/AddText';
import ParsedKeyphrases from '../components/ParseText/ParsedKeyphrases';

export default class ParseTextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TEXT_API: 'http://127.0.0.1:8000/api/text',
      keyphrases: ''
    }
  }

  render() {
    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        mt={2}>

        <AddText
          TEXT_API={this.state.TEXT_API} />

        <ParsedKeyphrases />
      </Box>
    );
  }
}
