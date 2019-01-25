import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Meteor} from "meteor/meteor";
import Links from "../api/bots";
import { withTracker } from 'meteor/react-meteor-data';

const styles = {
    dutchSpace: {
        backgroundColor: '#ff9578',
    },
};

let Profile= ({classes, user}) => {
    if (user === null)
        return <div>LOG IN!</div>

    return(
        <div className={classes.dutchSpace}>
            I am another page!
        </div>
    );
};

Profile = withStyles(styles)(Profile);


Profile = withTracker(() => {
    return {
        user: Meteor.user(),
    };
})(Profile);

export default Profile;