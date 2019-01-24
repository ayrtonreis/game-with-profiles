export const CHANGE_CURRENT_PLAYER = 'CHANGE_CURRENT_PLAYER';

export function changeCurrentPlayer(playerId){
    return {
      type: CHANGE_CURRENT_PLAYER,
      playerId,
    };
}

export function currentPlayerReducer(state = 4, action){

    if(action.type === CHANGE_CURRENT_PLAYER){
        return action.playerId;
    }

    return state;
}


