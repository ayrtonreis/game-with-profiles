import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Player from './Player'
import DutchSpace from './DutchSpace'
import {Meteor} from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';

const styles = {
    field: {
        // backgroundColor: '#ffdb96',
        display: 'grid',
        padding: '10px',
        gridTemplateColumns: '1fr 1fr',
    },
    player: {
        backgroundColor: '#ffaba1',
        margin: '8px',
        minHeight: '50px'
    },
    dutchSpace: {
        backgroundColor: '#ff9578',
        margin: '8px',
        gridColumn: '1/3',
        minHeight: '100px'

    },
};

let Field = ({
                 classes,
                 playing,
                 bots = {1: null, 2: null, 3: null}
}) => {
    return(
        <div style={{backgroundColor: playing ? '#b3b3b3' : '#ffdb96'}} className={classes.field}>
            <Player id={1} isBot botId={bots[1]} />
            <Player id={2} isBot botId={bots[2]} />

            <DutchSpace/>

            <Player id={3} isBot botId={bots[3]} />
            <Player id={4} />
        </div>
    );
};

Field = withStyles(styles)(Field);

Field = withTracker(() => {
    Meteor.subscribe("userInfo");
    //console.warn(Meteor.user());

    const user = Meteor.user();

    if(user === null)
        return {};
    else if(user){

    }

    let bots = {
        1: 'bot1',
        2: 'bot2',
        3: 'bot3'
    };

    try {
        if(Meteor.user().avatar){
            const favBots = Meteor.user().favoriteBots;

            if(favBots){
                bots[1] = favBots[0] || bots[1];
                bots[2] = favBots[1] || bots[2];
                bots[3] = favBots[2] || bots[3];
            }
        }
    }
    catch (e) {}


    return {
        bots
    };
})(Field);

export default Field;