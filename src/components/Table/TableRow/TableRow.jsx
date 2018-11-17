import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'block'
  },
  selected: {
    backgroundColor: 'rgba(232, 232, 232, 0.5)'
  }
});

export const TableRowContext = React.createContext();

export class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRowSelected: false,
      toggleRowSelected: () => {
        this.setState(state => ({ isRowSelected: !state.isRowSelected }));
      }
    };
  }

  render() {
    return (
      <TableRowContext.Provider value={this.state}>
        <tr className={this.state.isRowSelected ? this.props.classes.selected : ''}>
          {this.props.children}
        </tr>
      </TableRowContext.Provider>
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
)(withStyles(styles)(TableRow));