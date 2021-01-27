import React from 'react';

import WikiLinkButton from '../../Buttons/WikiLinkButton'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default function ParsedKeyphrases(props) {
  const dsmb = props.kp_dsmb ? 'Disambiguous' : 'Ambiguous';

  return (
    <Card
      variant='outlined'
      style={{
        margin: 'auto',
        maxWidth: 800,
        marginTop: '10px'
      }}
    >
      <CardContent>

        <Typography variant="h5" component="h2">
          {props.kp_content}
        </Typography>

        <Typography color="textSecondary" >
          Score - {props.kp_score}
        </Typography>

        <Typography variant="caption" display="block">
          {dsmb}
        </Typography>

      </CardContent>
      
      <CardActions>
        <WikiLinkButton link={props.kp_link} />
      </CardActions>
    </Card>
  );
}
