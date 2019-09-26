import React, {
    Component,
    Fragment
} from 'react'
import PropTypes from "prop-types";
import Comments from './Comments';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm.js';


import dayjs from 'dayjs';
import {
    Link
} from 'react-router-dom';

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icon
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import {connect} from 'react-redux';
import {
    getScream,
    clearErrors
} from '../../redux/actions/dataActions';

const styles = theme =>  ({
    ...theme.spreadThis,
   
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});
class ScreamDialog extends Component {

    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({
            open: true
        });
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        this.setState({
            open: false
        });
        this.props.clearErrors()
    }
    render() {
        console.log(this.props);
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: {
                loading
            }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                   <CircularProgress size={200} thickness={2}/>
            </div>
         
        ): (
            <Grid container spacing={10}>
                <Grid item sm={5}> 
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid> 
                <Grid item sm={7}> 
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`} >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant="body2" color="secondary">
                        {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant="body1">{body}</Typography> 
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip = "comments">
                            <ChatIcon color = "primary" / >
                    </MyButton>                    
                    <span> {commentCount} comments </span> 
                </Grid> 
                <hr className={classes.visibleSeperator} />
                <CommentForm screamId={screamId}/>
                <Comments comments={comments} />
            </Grid>
        )
        return ( 
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    onClose={this.handleClose}
                    open={this.state.open} 
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                            <CloseIcon />
                    </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>   
                </Dialog>
               
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});
const mapActionsToProps = {
    getScream,
    clearErrors
};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))