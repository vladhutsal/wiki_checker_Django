import React, { useEffect, useState } from 'react';

import { handleRequest } from '../services/apiHandler';

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export default function TextHistory(props) {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    (async function () {
      const resp = await handleRequest('GET', props.TEXT_API_URL);
      setTexts(resp.data);
    }());
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {texts.map(text => (
        <Card
          style={{
            margin: 'auto',
            maxWidth: 800,
            marginTop: '10px'
          }}
          variant='outlined'
          key={text.id}
        >
          <CardContent>
            <Typography>
              {text.text_content}
            </Typography>
          </CardContent>
        </Card>
      ))}

    </Container>
  );
}
