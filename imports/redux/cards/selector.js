import pileTypes from '../../pileTypes'
import {emptyCardObj} from '../../utils'

export function selectNumberCardsInDutchPile (state, playerId) {
    const playerData = state.cards[`player${playerId}Data`];

    return playerData.nbCardsInDutchPiles;
}

export function selectLastCardInBlitzPile (state, playerId) {
    const playerData = state.cards[`player${playerId}Data`];

    return playerData[pileTypes.BLITZ_PILE].slice(-1)[0] || emptyCardObj;
}

export function selectLastCardInWoodPile (state, playerId) {
    const playerData = state.cards[`player${playerId}Data`];

    return playerData[pileTypes.WOOD_PILE].slice(-1)[0] || emptyCardObj;
}

export function selectLastCardInLeftPostPile (state, playerId) {
    const playerData = state.cards[`player${playerId}Data`];

    return playerData[pileTypes.LEFT_POST_PILE].slice(-1)[0] || emptyCardObj;
}

export function selectLastCardInMiddlePostPile (state, playerId) {
    const playerData = state.cards[`player${playerId}Data`];

    return playerData[pileTypes.MIDDLE_POST_PILE].slice(-1)[0] || emptyCardObj;
}

export function selectLastCardInRightPostPile (state, playerId) {
    const playerData = state.cards[`player${playerId}Data`];

    return playerData[pileTypes.RIGHT_POST_PILE].slice(-1)[0] || emptyCardObj;
}

export function selectLastCardInDutchPile (state, pileIndex) {
    const dutchPiles = state.cards.dutchPiles;

    return dutchPiles[pileIndex] || emptyCardObj;
}