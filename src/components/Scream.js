import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';

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
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
//redux
import {
    connect
} from 'react-redux';
import {
    likeScream,
    unlikeScream
} from '../redux/actions/dataActions';


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
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
            return true;
        } else return false;
    }
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }

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
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ): (
            this.likedScream() ? (
                <MyButton tip="Undo Like" onClick={this.unlikeScream}>
                    <Favorite color="primary" />
                </MyButton>
            ):( <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary" />
            </MyButton>) 
        );
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
                        {likeButton} <span> {likeCount} Likes </span>
                        <MyButton tip = "comments">
                            <ChatIcon color = "primary" / >
                        </MyButton> 
                        <span> {commentCount} comments </span> 
                    </CardContent> 
                </Card> 
            </div>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
});
const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));