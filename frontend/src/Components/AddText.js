import React from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { handleRequest } from '../Services/APIManager'

export default class AddText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  async saveText(event) {
    event.preventDefault();
    const data = { text_content: this.state.text };
    const resp = await handleRequest('POST', `${this.props.textApiUrl}/create/`, data);
    console.log(resp);
    
  }

  render() {
    return (
      <form onSubmit={ this.saveText }>
        <TextField
          onChange={ this.handleChange }
          value={ this.state.text }
          multiline
          rows={8}
          variant="outlined" 
          label="Put your text here" 
          style = {{width: 800}} 
        />
        <Box mt={2}>
          <Button
            type='submit'
            variant="contained" 
            color="primary"
            fullWidth={true}>
              Add
          </Button>
        </Box>
      </form>
    );
  }
}