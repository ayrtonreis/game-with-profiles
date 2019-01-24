import pileTypes from '../../pileTypes'
import {
    generateCardsArray,
    shuffleArray,
    colors,
    emptyCardObj
} from '../../utils'
import {TOGGLE_PLAY_PAUSE} from "../playing";

const validPileTypesToRemoveFrom = [
    pileTypes.WOOD_PILE,
    pileTypes.LEFT_POST_PILE,
    pileTypes.MIDDLE_POST_PILE,
    pileTypes.RIGHT_POST_PILE,
    pileTypes.BLITZ_PILE
];

export const actionList = {
    RESET_CARDS: 'RESET_CARDS',
    SELECT_CARD: 'SELECT_CARD',
    MOVE_CARD_TO_DUTCH_PILE: 'MOVE_CARD_TO_DUTCH_PILE',
    MOVE_CARD_TO_POST_PILE: 'MOVE_CARD_TO_POST_PILE',
    MOVE_CARDS_TO_WOOD_PILE: 'MOVE_CARDS_TO_WOOD_PILE',
    MOVE_CARDS_TO_HAND: 'MOVE_CARDS_TO_HAND',
    DEAL_CARDS: 'DEAL_CARDS',
    CLEAR_SELECTION: 'CLEAR_SELECTION',
    NOOP: 'NOOP',
};

// ***************************************************** LOW LEVEL *****************************************************

export const testingAction = (cardOwnerId) => ({
    type: 'TESTING_FUNCTION',
    cardOwnerId

});

export const clearSelection = (playerId) => ({
    type: actionList.CLEAR_SELECTION,
    playerId

});

export const noop = () => ({
    type: 'NOOP',
});

export function resetCards() {
    return {
        type: actionList.RESET_CARDS,
    }
}

export const moveCardToDutchPile = (playerId, dutchPileIndex) => ({
    type: actionList.MOVE_CARD_TO_DUTCH_PILE,
    playerId,
    dutchPileIndex
});

// Move 3 cards from hand to Wood Pile
export const moveCardsToWoodPile = (playerId) => ({
    type: actionList.MOVE_CARDS_TO_WOOD_PILE,
    playerId
});

export const moveCardsToHand = (playerId) => ({
    type: actionList.MOVE_CARDS_TO_HAND,
    playerId
});

export const moveCardToPostPile = (playerId, postPileKey) => ({
    type: actionList.MOVE_CARD_TO_POST_PILE,
    playerId,
    postPileKey
});

export const selectCard = (playerId, pileType) => ({
    type: actionList.SELECT_CARD,
    playerId,
    pileType
});

export const dealCards = (decks) => ({
    type: actionList.DEAL_CARDS,
    decks
});
// ***************************************************** HIGH LEVEL *****************************************************

function checkMovementPostPile(card, pile){
    const lastCard = pile.slice(-1)[0] || emptyCardObj;

    if(lastCard.number === 0)
        return true;

    return (lastCard.gender !== card.gender && lastCard.number - card.number === 1);
}

function checkMovementDutchPile(card, pile){
    const lastCard = pile || emptyCardObj;

    if(lastCard.number === 0 && card.number === 1)
        return true;

    return (lastCard.color === card.color &&  card.number - lastCard.number === 1);
}

export const moveCardIfValid = (playerId, cardOwnerId, pileType, pileIndex) => {
  return (dispatch, getState) => {
      const { cards } = getState();
      const {[`player${playerId}Data`]: playerData} = cards;

      if(pileType === pileTypes.DUTCH_PILE){

          const originPile = playerData.selectedCardOrigin;
          const card = playerData[originPile].slice(-1)[0] || emptyCardObj;

          // console.warn(checkMovementDutchPile(card, cards.dutchPiles[pileIndex]));

          if(checkMovementDutchPile(card, cards.dutchPiles[pileIndex]))
              dispatch(moveCardToDutchPile(playerId, pileIndex));
          else
              dispatch(clearSelection(playerId));
      }
      else if(playerId === cardOwnerId){
          const originPile = playerData.selectedCardOrigin;
          const card = playerData[originPile].slice(-1)[0] || emptyCardObj;

          console.log('%c SelectedCard: ', 'background: #888; color: #ffff00', card);

          switch(pileType){
              case pileTypes.LEFT_POST_PILE:
                  if(checkMovementPostPile(card, playerData[pileTypes.LEFT_POST_PILE]))
                      dispatch(moveCardToPostPile(playerId, pileTypes.LEFT_POST_PILE));
                  else
                      dispatch(clearSelection(playerId));
                  break;
              case pileTypes.MIDDLE_POST_PILE:
                  if(checkMovementPostPile(card, playerData[pileTypes.MIDDLE_POST_PILE]))
                      dispatch(moveCardToPostPile(playerId, pileTypes.MIDDLE_POST_PILE));
                  else
                      dispatch(clearSelection(playerId));
                  break;
              case pileTypes.RIGHT_POST_PILE:
                  if(checkMovementPostPile(card, playerData[pileTypes.RIGHT_POST_PILE]))
                      dispatch(moveCardToPostPile(playerId, pileTypes.RIGHT_POST_PILE));
                  else
                      dispatch(clearSelection(playerId));
                  break;
              default:
                  dispatch(clearSelection(playerId));
          }
      }
      else{
          dispatch(clearSelection(playerId));
      }

  };
};

export const selectOriginCardIfValid = (playerId, cardOwnerId, pileType, isBot) => {

    //console.log('select card origin!');
    return (dispatch, getState) => {
        
        console.warn(getState(),playerId, cardOwnerId, pileType)
        console.warn(getState().cards[`player${playerId}Data`])
        console.warn(getState().cards[`player${playerId}Data`][pileType])
        console.warn(getState().cards[`player${playerId}Data`][pileType].length)
        if( playerId === cardOwnerId &&
            getState().cards[`player${playerId}Data`][pileType].length > 0 &&
            validPileTypesToRemoveFrom.includes(pileType)
        ) {

            dispatch(selectCard(playerId, pileType));
        }
        else {

            dispatch(noop());
        }
    }
};

export const cardClicked = (cardOwnerId, pileType, pileIndex, isBot) => {
    //console.log("inside cardCliked thunk", cardOwnerId, pileType, pileIndex);

    return (dispatch, getState) => {
        const { currentPlayerId, cards, playing } = getState();
        const prevSelectedCard = cards[`player${currentPlayerId}Data`].selectedCardOrigin;

        if(!playing){
            dispatch(noop());
        }
        // If the player is selecting the origin of the play movement
        else if(prevSelectedCard === null){
            dispatch(selectOriginCardIfValid(currentPlayerId, cardOwnerId, pileType));
        }
        else{
            dispatch(moveCardIfValid(currentPlayerId, cardOwnerId, pileType, pileIndex));
        }
    };
};

export const plusWoodPileClicked = (cardOwnerId) => {

    return (dispatch, getState) => {
        const { currentPlayerId, cards, playing } = getState();

        if(!playing)
            dispatch(noop());
        else if(currentPlayerId === cardOwnerId){
            const playerHand = cards[`player${currentPlayerId}Data`].hand;

            if(playerHand.length)
                dispatch(moveCardsToWoodPile(cardOwnerId));
            else
                dispatch(moveCardsToHand(cardOwnerId));
        }
        else{
            dispatch(noop());
        }
    }
};

export const cardClickedByBot = (botPlayerId, cardOwnerId, pileType, pileIndex) => {
    console.log('first dispatch')
    console.log("CARD CLICKED BY BOT", cardOwnerId, pileType, pileIndex);

    return (dispatch, getState) => {
        const { cards, playing } = getState();
        const prevSelectedCard = cards[`player${botPlayerId}Data`].selectedCardOrigin;

        if(!playing){
            console.log("no op")
            dispatch(noop());
        }
        // If the player is selecting the origin of the play movement
        else if(prevSelectedCard === null){
            console.log("bot selected card")
            console.log(botPlayerId)
            console.log(cards[`player${botPlayerId}Data`])
            console.log(cards[`player${botPlayerId}Data`].selectedCardOrigin)
            dispatch(selectOriginCardIfValid(botPlayerId, cardOwnerId, pileType));
        }
        else{
            console.log("bot moved card")
            dispatch(moveCardIfValid(botPlayerId, cardOwnerId, pileType, pileIndex));
        }
    };
};

export const plusWoodPileClickedByBot = (botPlayerId, cardOwnerId) => {

    return (dispatch, getState) => {
        const { cards, playing } = getState();

        if(!playing)
            dispatch(noop());
        else if(botPlayerId === cardOwnerId){
            const playerHand = cards[`player${botPlayerId}Data`].hand;

            if(playerHand.length)
                dispatch(moveCardsToWoodPile(cardOwnerId));
            else
                dispatch(moveCardsToHand(cardOwnerId));
        }
        else{
            dispatch(noop());
        }
    }
};

export const shuffleAndDealCards = () => {

    const decks = shuffleArray(Array(4).fill().map(() => shuffleArray(generateCardsArray())));

    return (dispatch) => {
        dispatch(dealCards(decks));
    }
};


export function dispatchClickOnTwoPiles(playerNumber, pileType, pileIndex) {
    return (dispatch, getState) => {
        //console.log(playerNumber);
        dispatch(cardClickedByBot(playerNumber, playerNumber, pileType))
        // .then(
        //     () => {
                if (!!getState().cards[`player${playerNumber}Data`].selectedCardOrigin)
                    dispatch(cardClickedByBot(playerNumber, playerNumber, pileTypes.DUTCH_PILE, pileIndex))
                else
                    console.log('NOOOOO dispatch')
            // }
            // () => dispatch(cardClickedByBot(playerNumber, playerNumber, pileTypes.DUTCH_PILE, pileIndex))
        // )
    }
}