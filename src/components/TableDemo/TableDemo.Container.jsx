import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import TableDemo from './TableDemo';

const styles = {
  root: {
    width: '100%',
    marginTop: 10,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

export class TableDemoContainer extends React.Component {
  render() {
    return (
      <TableDemo {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  table: state.table
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // myFunc: () => dispatch(myFunc(ownProps.property))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TableDemoContainer));