import React from 'react';

import Button from '@material-ui/core/Button';


export default function WikiLinkButton(props) {
  return (
    <Button
      variant="contained"
      size="small"
      href={props.link}
      disabled={!props.link}
      color="default"
    >
      Wiki link
    </Button>
  );
}

