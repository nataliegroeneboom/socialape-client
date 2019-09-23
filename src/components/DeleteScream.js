import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
// material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button'; 
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// material UI icon
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';


const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '6%'
    }
}

class DeleteScream extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
          <Fragment>
                <MyButton tip="Delete Scream" 
                            onClick={this.handleOpen}
                            btnClassName={classes.deleteButton}
                >
                        <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Are you sure you want to delete this Scream?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteScream} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>         
        </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream))