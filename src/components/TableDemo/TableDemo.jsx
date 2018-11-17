import * as React from 'react';
import { Checkbox, Paper, Button, withStyles } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../Table';

const styles = {
  root: {
    textTransform: 'none',
    whiteSpace: 'pre-line',
    height: '100%',
  },
};

const ContentCell = withStyles(styles)(({ editOpen, ref, value, type, classes }) => {
  return (
    <Button fullWidth={true} variant="contained" color={type} className={classes.root} onClick={editOpen} ref={ref}>
      {value}
    </Button>
  );
});

const HeaderCell = withStyles(styles)(({ value, classes }) => {
  return (
    <Button fullWidth={true} className={classes.root}>
      {value}
    </Button>
  );
});

export default (props) => {
  const { table, classes } = props;  //state
  // const { } = props;  //dispatch

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {table.headers.map(header => (
              <TableCell key={header.id} value={header.value}>
                {(context) => <HeaderCell {...context} />}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.data.map(row => (
            <TableRow key={row.id}>
              <TableCell key="select">
                {({ toggleRow }) => <Checkbox onChange={toggleRow} />}
              </TableCell>
              {table.headers.map(header => (
                !!row.data[header.id] && <TableCell key={row.data[header.id]} value={row.data[header.id]}>
                  {(context) => <ContentCell {...context} type={context.value <= 3 ? 'primary' : 'secondary'} />}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
