import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

//dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
// material UI 
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//material ui Icons
import ChatIcon from '@material-ui/icons/Chat';
 
//redux
import {
    connect
} from 'react-redux';



const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        marginRight: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'

    },
    content: {
        padding: 25
    }
}
class Scream extends Component {
  
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user:{ authenticated, credentials: {handle} } 

        } = this.props;
   
        const deleteButton = authenticated &&  userHandle === handle ?(
            //if authenticated and their own 'scream'
            <DeleteScream screamId={screamId}/>
        ):(
            // either not authenticated or not their own 'scream'
            null
        );
        return ( 
            <div>
                <Card className = {classes.card} >
                    <CardMedia  image = {userImage}
                                className = { classes.image}
                                title = "Profile image" />
                    <CardContent className = {classes.details} >
                        <Typography variant = "h5"
                                    component = {Link}
                                    to = {`/users/${userHandle}`}
                                    color = "primary"
                        > 
                        {userHandle} 
                        </Typography>
                        {deleteButton} 
                        <Typography     variant = "body2"
                                        color = "textSecondary" 
                                        > 
                                        {dayjs(createdAt).fromNow()} 
                        </Typography> 
                        <Typography variant = "body2" > 
                        {body} 
                        </Typography> 
                        <LikeButton screamId={screamId}/>
                        <span> {likeCount} Likes </span>
                        <MyButton tip = "comments">
                            <ChatIcon color = "primary" / >
                        </MyButton> 
                        <span> {commentCount} comments </span> 
                        <ScreamDialog screamId={screamId} userHandle={userHandle} />
                    </CardContent> 
                </Card> 
            </div>
        );
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
});


export default connect(mapStateToProps)(withStyles(styles)(Scream));