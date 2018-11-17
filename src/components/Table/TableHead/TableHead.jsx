import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Table2Context } from '../Table/Table';

const styles = theme => ({
  root: {
    // display: 'block'
    // height: '40px'
  }
});

const store = {
  isHead: true,
  isEditable: false,
};

export class TableHead extends React.Component {
  // constructor(props) {
  //   super(props);
  //   console.log(this.props);
  // }
  render() {
    return (
      <thead className={this.props.classes.root}>
        <Table2Context.Provider value={store}>
          {this.props.children}
        </Table2Context.Provider>        
      </thead>
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
)(withStyles(styles)(TableHead));