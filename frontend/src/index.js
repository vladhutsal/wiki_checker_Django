import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import Container from '@material-ui/core/Container';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container maxWidth='lg'>
        <App />
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
