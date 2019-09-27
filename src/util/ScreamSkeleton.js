import React, {  Fragment } from 'react';
import NoImg from '../images/blank_profile.png';
import PropTypes from 'prop-types';

// Material UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    
  ...theme.spreadThis
})

const ScreamSkeleton = (props) =>  {
    const {classes} = props;
    const content = Array.from({length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent} >
                <div className={classes.handle}></div>
                <div className={classes.date}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
            </CardContent>
        </Card>
    ) )
    return <Fragment> {content}</Fragment>

}

ScreamSkeleton.propTypes = {
classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeleton)
