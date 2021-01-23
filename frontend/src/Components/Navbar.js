import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Button color="inherit">Add text</Button>
          <Button color="inherit">Keyphrases rank</Button>
          <Button color="inherit">Text history</Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
