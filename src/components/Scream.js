import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
//dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
// material UI cards
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        marginRight: 20
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
        const { classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount} } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia image={userImage}
                                className={classes.image}
                                title="Profile image"/>
                    <CardContent className ={classes.details}>
                        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant="body2">{body}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Scream);
