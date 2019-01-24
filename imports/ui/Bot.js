import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import pileTypes from '../pileTypes'
import {cardClickedByBot, dispatchClickOnTwoPiles, plusWoodPileClickedByBot} from '../redux/cards/action';


class Bot extends React.Component {

    componentDidMount() {
        // set state.time every 'delaySec' (from the props) --> this induces a re-render --> render has the bot's game logic
        const {delaySec} = this.props;
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000 * delaySec);  // the setInterval function uses milliseconds
    }

    render () {

        const {
            id,
            playerNumber,
            on,
            visionProbability,
            // etc

            // callbacks to send the actions to store (to move the cards, for instance)
            moveCard,
        } = this.props;

        if (!on)
            return null;

        // ******************
        //    your logic
        //       ...
        // ******************

        // replace this by your code to move a card
        // if (Math.random() < visionProbability)
        //     moveCard();

        const NUM_DUTCH_PILES = 20
        const originPiles = [   //pileTypes.WOOD_PILE,
                                pileTypes.LEFT_POST_PILE,
                                pileTypes.MIDDLE_POST_PILE,
                                pileTypes.RIGHT_POST_PILE,
                                pileTypes.BLITZ_PILE];

        const originIndex = Math.floor(Math.random() * Math.floor(originPiles.length));
        const destinationIndex = Math.floor(Math.random() * Math.floor(NUM_DUTCH_PILES ));

        console.warn('in bot', originIndex, originPiles[originIndex])
        moveCard(originPiles[originIndex], destinationIndex);

        /* this doesn't render anything, because it's intention is only to run the logic */
        return <div id={id}></div>;
    }
}

// reminder, in the mapStateToProps function, the first argument is the coming from the store
// and the second one (if present) is the 'ownProps', that is, the object of props passed to the real component (BotsContainer in this case)
// !!! remember to use selectors instead !!!
function mapStateToProps({
                             // whatever the name is in your state (of the store)
                             playing,
                         }, {
                             // you will probably use this to chose the correct player's state
                             playerNumber,
                         }) {
    return {
        on: playing,
        // ...
    }
}

function mapDispatchToProps(dispatch, {playerNumber}) {
    return {
        // (for info) pay attention how it's possible to 'bind' the id to the moveCard...
        // this way, the component Bot doesn't need to know that dispatch (that woudl be here) needs the id
        // the Bot only calls a function without any argument - therefore making it less responsible for the logic behind this
        moveCard: (pileType, pileIndex) => dispatch(dispatchClickOnTwoPiles(playerNumber, pileType, pileIndex)),  // look at chrome's console
    }
}

Bot = connect(mapStateToProps, mapDispatchToProps)(Bot);

// Bot.propTypes = {
//     id: PropTypes.string.isRequired,
//     on: PropTypes.bool.isRequired,
//     delaySec: PropTypes.number.isRequired,
//     moveCard: PropTypes.func.isRequired,
// };

export default Bot;