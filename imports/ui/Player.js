import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import WoodPile from './WoodPile'
import PostPile from './PostPile'
import BlitzPile from './BlitzPile'
import {cardClicked, plusWoodPileClicked} from "../redux/cards/action";
import {connect} from "react-redux";
import {Meteor} from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import BotsCollection from '../api/bots'

const styles = {
    player: {
        backgroundColor: '#ffaba1',
        margin: '8px',
        minHeight: '50px'
    },

    header: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        display: 'grid',
        gridTemplateColumns: '50px auto',
        alignItems: 'center'
    },

    space: {
        display: 'grid',
        gridGap: '2px',
        padding: '8px',
        gridTemplateColumns: 'repeat(5, 1fr)'
    },
    playerFooter: {
        display: 'grid',
        gridGap: '2px',
        padding: '0 8px 4px 8px',
        gridTemplateColumns: 'repeat(5, 1fr)',

        fontSize: '10px'
    }
};


let Player = ({
                  classes,
                  id = null,
                  name = null,
                  onClick,
                  avatar = null,
}) => {
    const isPlayerValid = id && name && avatar;

    return(
        <div className={classes.player}>
            {   isPlayerValid ?

                <div className={classes.header}>
                    <div><Avatar src={`avatars/${avatar}.png`} /></div>

                    <div>{name}</div>
                </div>

                : ''
            }
            <div className={classes.space}>
                <WoodPile cardOwnerId={id}/>
                <PostPile cardOwnerId={id}/>
                <BlitzPile cardOwnerId={id}/>
            </div>

            <div className={classes.playerFooter}>
                <button
                    style={{fontSize: '8px'}}
                    onClick={onClick}
                >+</button>
            </div>
        </div>
    );
};

Player = withStyles(styles)(Player);

function mapDispatchToProps(dispatch, ownProps){
    const {id: cardOwnerId} = ownProps;
    return{
        onClick: () => dispatch(plusWoodPileClicked(cardOwnerId)),
    }
}

Player = connect(null, mapDispatchToProps)(Player);

const tracker = ({isBot, botId}) => {
    const user = Meteor.user();
    Meteor.subscribe("bots");

    // Checks if the user is logged
    if(!user)
        return {};

    if (isBot) {
        try {
            const botObj = (BotsCollection.find({_id: botId}).fetch())[0];
            console.warn('BOT FOUND: ', botObj.name, botObj.avatar)

            return {
                name: botObj.name,
                avatar: botObj.avatar,
            }
        }
        catch (e) {}
    }
    else {
        try {
            const userLabel = user.nickname || user.name || user.emails[0].address;
            console.warn(user.name);
            if(userLabel){
                return {
                    name: userLabel.toString(),
                    avatar: '01'
                }
            }
        }
        catch (e) {}
    }

    return {};
};

Player = withTracker(tracker)(Player);

export default Player;