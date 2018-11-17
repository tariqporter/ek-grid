import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Table2Context } from '../Table/Table';

const styles = theme => ({
  root: {
    display: 'block'
  }
});

// const CustomCell = (value) => (
//   <div>
//     hello {value}
//   </div>
// );

const store = {
  isHead: false,
  isEditable: true,
  // onClick: e => console.log(e.target.innerHTML),
  // cellRenderer: CustomCell
};

export class TableBody extends React.Component {
  render() {
    return (
      <tbody>
        <Table2Context.Provider value={store}>
          {this.props.children}
        </Table2Context.Provider>
      </tbody>
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
)(withStyles(styles)(TableBody));