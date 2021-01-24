import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <AppBar position="static" color="white">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Link to="/add_text">
            <Button color="inherit">Parse text</Button>
          </Link>
          <Link to="/rank">
            <Button color="inherit">Keyphrases rank</Button>
          </Link>
          <Button color="inherit">Text history</Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
