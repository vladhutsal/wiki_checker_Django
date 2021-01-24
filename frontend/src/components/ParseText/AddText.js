import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';



export default class AddText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveText(this.state.text);
  }

  render() {
    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        mt={2}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleChange}
            value={this.state.text}
            multiline
            rows={8}
            variant="outlined"
            label="Put your text here"
            style={{ width: 800 }}
          />
          <Box mt={2}>
            <Button
              type='submit'
              variant="contained"
              color="white"
              fullWidth={true}>
              Parse text
          </Button>
          </Box>
        </form>
      </Box>
    );
  }
}
