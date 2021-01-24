import React from 'react';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export default class ParsedKeyphrases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyphrases: []
    }
  }

  render() {
    return (
      <Box>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={this.props.kp}
              secondary={
                <>
                  {" I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
        </List>
        <Divider />
      </Box>
    );
  }
}
