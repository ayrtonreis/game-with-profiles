import { combineReducers } from 'redux'
import pileTypes from '../../pileTypes'
import {actionList} from './action'
import {emptyCardObj} from '../../utils'

function addToDutchPile(piles, card, position){
    const newPiles = [...piles];
    newPiles[position] = card;

    // return new dutch piles
    return newPiles;
}

function addToWoodPile(pile, cards){
    // return new wood pile
    return [...pile, ...cards]
}

function addToPostPile(pile, card){
    // return new post pile
    return [...pile, card];
}

function noop(state){
    console.log('NO OP');
    return state;
}

function removeTopCards(pile, numberOfCards){
    return pile.slice(0, -numberOfCards)
}

const initialState = {
    dutchPiles: [],

    player1Data: {
        nbCardsInDutchPiles: 0,

        [pileTypes.BLITZ_PILE]: [],

        [pileTypes.LEFT_POST_PILE]: [],

        [pileTypes.MIDDLE_POST_PILE]: [],

        [pileTypes.RIGHT_POST_PILE]: [],

        [pileTypes.WOOD_PILE]: [],

        hand: [],

        selectedCardOrigin: null,
    },

    player2Data: {
        nbCardsInDutchPiles: 0,

        [pileTypes.BLITZ_PILE]: [],

        [pileTypes.LEFT_POST_PILE]: [],

        [pileTypes.MIDDLE_POST_PILE]: [],

        [pileTypes.RIGHT_POST_PILE]: [],

        [pileTypes.WOOD_PILE]: [],

        hand: [],

        selectedCardOrigin: null,
    },

    player3Data: {
        nbCardsInDutchPiles: 0,

        [pileTypes.BLITZ_PILE]: [],

        [pileTypes.LEFT_POST_PILE]: [],

        [pileTypes.MIDDLE_POST_PILE]: [],

        [pileTypes.RIGHT_POST_PILE]: [],

        [pileTypes.WOOD_PILE]: [],

        hand: [],

        selectedCardOrigin: null,
    },

    player4Data: {
        nbCardsInDutchPiles: 0,

        [pileTypes.BLITZ_PILE]: [],

        [pileTypes.LEFT_POST_PILE]: [],

        [pileTypes.MIDDLE_POST_PILE]: [],

        [pileTypes.RIGHT_POST_PILE]: [],

        [pileTypes.WOOD_PILE]: [],

        hand: [],

        selectedCardOrigin: null,
    }
};

function buildPlayerData(deck){

    const postPileArray = deck.slice(0, 3);
    const blitzArray = deck.slice(3, 13);
    const handArray = deck.slice(13);

    return ({
        nbCardsInDutchPiles: 0,

        [pileTypes.BLITZ_PILE]: blitzArray,

        [pileTypes.LEFT_POST_PILE]: [postPileArray[0]],

        [pileTypes.MIDDLE_POST_PILE]: [postPileArray[1]],

        [pileTypes.RIGHT_POST_PILE]: [postPileArray[2]],

        [pileTypes.WOOD_PILE]: [],

        hand: handArray,

        selectedCardOrigin: null,
    });
}

function cardsReducer(state=initialState, action){
    const newState = {...state};

    let playerDataKey, newPlayerData, selectedCardOrigin, card;

    switch(action.type){
        case actionList.RESET_CARDS:
            return initialState;

        case actionList.CLEAR_SELECTION:
            console.log('%c CLEAR_SELECTION! ', 'background: #888; color: #ffffff');

            playerDataKey = `player${action.playerId}Data`;
            newPlayerData = {...newState[playerDataKey]};

            //console.warn(action.playerId);

            newPlayerData.selectedCardOrigin = null;
            newState[playerDataKey] = newPlayerData;

            //console.log(newState);
            return newState;

            return initialState;
        case actionList.DEAL_CARDS:
            console.log('%c DEAL_CARDS! ', 'background: #888; color: #ffffff');

            const playerDataKeys = ['player1Data', 'player2Data', 'player3Data', 'player4Data'];

            playerDataKeys.forEach((playerDataKey, index) => {
                newState[playerDataKey] = buildPlayerData(action.decks[index]);
            });

            newState.dutchPiles = [];

            //console.log(newState);

            return newState;

        case actionList.SELECT_CARD:
            console.log('%c SELECT_CARD! ', 'background: #888; color: #ffffff');

            playerDataKey = `player${action.playerId}Data`;
            newPlayerData = {...newState[playerDataKey]};

            newPlayerData.selectedCardOrigin = action.pileType;
            newState[playerDataKey] = newPlayerData;

            //console.log(newState);
            return newState;

        case actionList.MOVE_CARDS_TO_WOOD_PILE:
            console.log('%c MOVE_CARDS_TO_WOOD_PILE! ', 'background: #888; color: #ffffff');
            //console.log('State before', state);

            playerDataKey = `player${action.playerId}Data`;
            newPlayerData = {...newState[playerDataKey]};

            const oldHand = newPlayerData.hand;
            const remainingHand = oldHand.slice(0, -3);
            const removedFromHand = oldHand.slice(-3);

            newPlayerData.hand = remainingHand;
            newPlayerData[pileTypes.WOOD_PILE] = addToWoodPile(newPlayerData[pileTypes.WOOD_PILE], removedFromHand);

            newState[playerDataKey] = newPlayerData;

            //console.log('State after', newState);

            return newState;

        case actionList.MOVE_CARD_TO_DUTCH_PILE:
            console.log('%c MOVE_CARD_TO_DUTCH_PILE! ', 'background: #888; color: #ffffff');

            playerDataKey = `player${action.playerId}Data`;
            newPlayerData = {...newState[playerDataKey]};
            selectedCardOrigin = newPlayerData.selectedCardOrigin;

            card = newPlayerData[selectedCardOrigin].slice(-1)[0];

            newPlayerData[selectedCardOrigin] = removeTopCards(newPlayerData[selectedCardOrigin], 1);
            newPlayerData.selectedCardOrigin = null;
            newPlayerData.nbCardsInDutchPiles = newPlayerData.nbCardsInDutchPiles + 1;

            newState[playerDataKey] = newPlayerData;
            newState.dutchPiles = addToDutchPile(state.dutchPiles, card, action.dutchPileIndex);

            //console.log(newState);
            return newState;

        case actionList.MOVE_CARD_TO_POST_PILE:
            console.log('%c MOVE_CARD_TO_POST_PILE! ', 'background: #888; color: #ffffff');

            playerDataKey = `player${action.playerId}Data`;
            newPlayerData = {...newState[playerDataKey]};
            selectedCardOrigin = newPlayerData.selectedCardOrigin;

            card = newPlayerData[selectedCardOrigin].slice(-1)[0];

            newPlayerData[selectedCardOrigin] = removeTopCards(newPlayerData[selectedCardOrigin], 1);
            newPlayerData.selectedCardOrigin = null;

            newPlayerData[action.postPileKey] = addToPostPile(newPlayerData[action.postPileKey], card);

            newState[playerDataKey] = newPlayerData;
            //newState.dutchPiles = addToDutchPile(state.dutchPiles, card, action.dutchPileIndex);

            //console.log(newState);
            return newState;

        case actionList.MOVE_CARDS_TO_HAND:

            console.log('%c MOVE_CARDS_TO_HAND! ', 'background: #888; color: #ffffff');

            playerDataKey = `player${action.playerId}Data`;
            newPlayerData = {...newState[playerDataKey]};

            console.log('Player before', newPlayerData);

            newPlayerData.hand = newPlayerData[pileTypes.WOOD_PILE];
            newPlayerData[pileTypes.WOOD_PILE] = [];

            newState[playerDataKey] = newPlayerData;

            //console.log('Player after', newPlayerData);

            return newState;

        default:
            console.log("%c NO OP", "color: #00aa00")
            return state;

    }

    return newState;
}

export default cardsReducer;