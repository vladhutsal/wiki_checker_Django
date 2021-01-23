import React from 'react';
import Navbar from './Components/Navbar';
import AddText from './Components/AddText';

import Box from '@material-ui/core/Box';
// import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TEXT_API: 'http://127.0.0.1:8000/api/text',
    }
  }

  render() {
    return (
      <>
        <Navbar></Navbar>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          mt={2}>
          <AddText 
            textApiUrl={this.state.TEXT_API}>
          </AddText>
        </Box>
      </>
    );
  }
}
