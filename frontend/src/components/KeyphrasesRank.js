import React, { useEffect, useState } from 'react';

import { handleRequest } from '../services/apiHandler';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function KeyphrasesRank(props) {
  const [keyphrases, setKeyphrases] = useState([]);
  const dataLength = keyphrases.length;

  useEffect(() => {
    (async function () {
      const resp = await handleRequest('GET', props.KP_API_URL);
      setKeyphrases(resp);
    }());
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper} style={{ 'marginTop': '10px' }}>
      <Table size="medium" aria-label="dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ 'fontWeight': 'bold' }}>Keyphrase</TableCell>
            <TableCell style={{ 'fontWeight': 'bold' }}>Rank</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataLength > 0 &&
            keyphrases.map(row => (
              <TableRow key={row.id}>
                <TableCell scope="row">
                  {row.kp_content}
                </TableCell>
                <TableCell scope="row">
                  {row.score}
                </TableCell>
              </TableRow>
            ))}

          {dataLength <= 0 &&
            <TableRow>
              <TableCell scope="row">
                Sorry, there is no data. Add something to see the table
                </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
