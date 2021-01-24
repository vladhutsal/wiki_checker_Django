import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class KeyphrasesRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_keyphrases: []
    };
  }

  render() {
    const dataLength = this.props.kp_list.length;

    return (
      <TableContainer component={Paper} style={{'margin-top': '10px'}}>
        <Table size="medium" aria-label="dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{'font-weight': 'bold'}}>Keyphrase</TableCell>
              <TableCell style={{'font-weight': 'bold'}}>Rank</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataLength > 0 &&
              this.props.kp_list.map(row => (
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

}
