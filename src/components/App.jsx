import * as React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TableDemo from './TableDemo/TableDemo.Container';

export class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
	  return (
		<React.Fragment>
		  <CssBaseline />
		  <div>
        <TableDemo />
		  </div>
		</React.Fragment>
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
)(App);