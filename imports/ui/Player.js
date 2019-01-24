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

const styles = {
    player: {
        backgroundColor: '#ffaba1',
        margin: '8px',
        minHeight: '50px'
    },

    header: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
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


let Player = ({classes, id, name, onClick, avatar}) => {
    return(
        <div className={classes.player}>

            <div className={classes.header}>
                <Avatar src={`avatars/${avatar}.png`} />
                {name}
            </div>

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
    Meteor.subscribe('users');


    if (isBot) {
        return {
            name: botId,
            avatar: '01'
        }
    }
    else {
        if(Meteor.user()){
            const user = Meteor.users.find({_id: Meteor.user()._id}).count();
            // console.log(user.userAvatar)


        }


        return {
            name: 'me',
            avatar: '05'
        }
    }

};

Player = withTracker(tracker)(Player);

export default Player;