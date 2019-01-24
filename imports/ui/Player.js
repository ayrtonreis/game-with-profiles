import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import WoodPile from './WoodPile'
import PostPile from './PostPile'
import BlitzPile from './BlitzPile'
import {cardClicked, plusWoodPileClicked} from "../redux/cards/action";
import {connect} from "react-redux";

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

let PlayerHeader = ({name = 'Player Name', classes}) => {
    return (
        <div className={classes.header}>
            {name}
        </div>
    );
};
PlayerHeader = withStyles(styles)(PlayerHeader);

let PlayerSpace = ({classes, id}) => {
    return (
        <div className={classes.space}>
            <WoodPile cardOwnerId={id}/>
            <PostPile cardOwnerId={id}/>
            <BlitzPile cardOwnerId={id}/>
        </div>
    );
};
PlayerSpace = withStyles(styles)(PlayerSpace);

let PlayerFooter = ({classes, id, onClick}) => {
    return (
        <div className={classes.playerFooter}>
            <button
                style={{fontSize: '8px'}}
                onClick={onClick}
            >+</button>
        </div>
    );
};

PlayerFooter = withStyles(styles)(PlayerFooter);

function mapStateToProps(state, ownProps){
    return {};
}

function mapDispatchToProps(dispatch, ownProps){
    const {id: cardOwnerId} = ownProps;
    return{
        onClick: () => dispatch(plusWoodPileClicked(cardOwnerId)),
    }
}

PlayerFooter = connect(mapStateToProps, mapDispatchToProps)(PlayerFooter);


let Player = ({classes, id, name}) => {
    return(
        <div className={classes.player}>
            <PlayerHeader name={name}/>
            <PlayerSpace id={id}/>
            <PlayerFooter id={id}/>
        </div>
    );
};

Player = withStyles(styles)(Player);

export default Player;