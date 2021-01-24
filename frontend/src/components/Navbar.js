import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Navbar() {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Button href='/add_text'>Parse text</Button>
          <Button href='/rank'>Keyphrases rank</Button>
          <Button href='/text_history'>Text history</Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
