import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core';
// import { connect } from 'react-redux';
import { TableContext, Table2Context } from '../Table/Table';
import { TableRowContext } from '../TableRow/TableRow';
// import { Manager, Target, Reference, Popper } from 'react-popper';
import outy from 'outy';
import { Button, Popper, Paper, Typography, Fade, TextField } from '@material-ui/core';
import { Save } from '@material-ui/icons';

const styles = {
  root: {
    border: '1px solid rgba(229, 229, 229, 1)'
  },
  head: {
    height: '80px'
  },
  body: {
    height: '40px'
  },
  popper: {
    // backgroundColor: '#efefef',
    // borderRadius: '7px',
    padding: '5px'
  },
  saveButton: {
    minWidth: 0,
    minHeight: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'scale(.7)',
  }
};

export function classJoin(classes) {
  return classes.join(' ');
}

class TableCell extends React.Component {
  constructor(props) {
    super(props);
  this.onEditChange = this.onEditChange.bind(this);
  this.setCellRef = this.setCellRef.bind(this);
  this.editOpen = this.editOpen.bind(this);
  this._handleOutsideTap = this._handleOutsideTap.bind(this);
  // this.cellKeyDown = this.cellKeyDown.bind(this);

    // console.log(props);
    this.textEditRef = React.createRef();
    this.state = {
      isOpen: false,
      value: this.props.value,
      editValue: this.props.value
    };
  }

  componentDidMount() {
    if (this.targetRef && !this.props.isHead) {
      this._setOutsideTap();
    }
  }

  componentDidUpdate(lastProps, lastState) {
    if (lastState.isOpen !== this.state.isOpen) {
      setTimeout(() => this._setOutsideTap())
    }
  }

  // componentWillUnmount() {
  //   this.outsideTap.remove()
  // }

  _setOutsideTap() {
    // console.log(this.targetRef, this.props);
    const elements = [this.targetRef];

    if (this.popperRef) {
      elements.push(this.popperRef)
    }

    if (this.outsideTap) {
      this.outsideTap.remove()
    }

    this.outsideTap = outy(
      elements,
      ['click', 'touchstart'],
      this._handleOutsideTap,
    )
  }

  _handleOutsideTap() {
    this.setState(state => ({ isOpen: false }));
  }

  editOpen() {
    const self = this;
    self.setState(state => ({ isOpen: true }));
    setTimeout(() => {
      if (self.textEditRef.current) {
        self.textEditRef.current.focus();
      }
    });
  }

  saveChange = () => {
    this.setState(state => ({ value: state.editValue, isOpen: false }));
  }

  onKeyDown = (e) => {
    // if ((e.metaKey || e.ctrlKey) && (e.which === 83 || e.key === 'Enter')) {
    // Shift + Enter for new line
    // Enter to save
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      this.saveChange();
    }
  }

  cellKeyDown = (e) => {
    // Tab 9
    // ArrowDown 40
    // ArrowUp 38
    // ArrowLeft 37
    // ArrowRight 39
    // console.log(e.key, e.which);
    // if (!this.state.isOpen) {
    // if ([40, 38, 37, 39].includes(e.which)) {
      this.props.focusCell(22, 33);
    // }
      
    // }
  }

  onEditChange(e) {
    const value = e.target.value;
    this.setState(state => ({ editValue: value }));
  }

  toggleRow = (e) => {
    // console.log(e.target.checked);
    this.props.toggleRowSelected();
  }

  setCellRef(t) {
    this.targetRef = findDOMNode(t);
  }

  render() {
    const { isHead, isEditable, classes, toggleRow, children, value } = this.props;
    // console.log(children);
    return (
      <td className={classJoin([classes.root, isHead ? classes.head : classes.body])} onKeyDown={this.cellKeyDown}>
          <React.Fragment>
            {children({ toggleRow: this.toggleRow, editOpen: this.editOpen, ref: this.setCellRef, value: this.state.value })}
            {isEditable &&
              <Popper open={this.state.isOpen} anchorEl={this.targetRef} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <div ref={t => this.popperRef = findDOMNode(t)} className={classes.popper}>
                        <TextField multiline value={this.state.editValue} onKeyDown={this.onKeyDown} onChange={this.onEditChange} inputRef={this.textEditRef} />
                        <Button className={classes.saveButton} onClick={this.saveChange}><Save /></Button>
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            }
          </React.Fragment>
      </td>
    );
  }
}

export default withStyles(styles)(React.forwardRef((props, ref) => (
  <TableContext.Consumer>
    {(tableContext) => {
      // console.log(tableContext);
      return (
        <Table2Context.Consumer>
          {(table2Context) => (
            <TableRowContext.Consumer>
              {(tableRowContext) => <TableCell {...props} {...tableContext} {...table2Context} {...tableRowContext} ref={ref} />}
            </TableRowContext.Consumer>
          )}
        </Table2Context.Consumer>
      );
    }}
  </TableContext.Consumer>
)));