import React from 'react';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default function ParsedKeyphrases(props) {
  const dsmb = props.kp_dsmb ? 'Disambiguous' : 'Ambiguous';
  const canSubmit = props.kp_link.length > 0;

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
        <Button
          variant="contained"
          size="small"
          href={props.kp_link}
          disabled={!canSubmit}
          color="default"
        >
          Wiki link
        </Button>
      </CardActions>
    </Card>
  );
}
