import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    borderSpacing: 0,
    // borderCollapse: 'collapse',
  }
});

export const TableContext = React.createContext();
export const Table2Context = React.createContext();

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusCell: (i, j) => {
        console.log(i, j);
      }
    };
  }

  render() {
    return (
      <TableContext.Provider value={this.state}>
        <table className={this.props.classes.root}>
          {this.props.children}
        </table>
      </TableContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  // myProperty: state.myProperty
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // myFunc: () => dispatch(myFunc(ownProps.property))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Table));