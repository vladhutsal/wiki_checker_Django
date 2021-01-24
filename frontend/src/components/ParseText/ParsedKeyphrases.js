import React from 'react';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import Divider from '@material-ui/core/Divider';


export default class ParsedKeyphrases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyphrases: []
    };
  }
  

  render() {
    const dsmb = this.props.kp_dsmb ? 'Disambiguous' : 'Ambiguous';
    const canSubmit = this.props.kp_link.length > 0;


    return (
        <Card style={{margin: 'auto', maxWidth: 800, 'margin-top': '10px'}} variant='outlined'>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.props.kp_content}
            </Typography>
            <Typography color="textSecondary" >
              Score - {this.props.kp_score}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {dsmb}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              href={this.props.kp_link}
              disabled={!canSubmit}
              color="primary">
              Wiki link
            </Button>
          </CardActions>
        </Card>
    );
  }
}
