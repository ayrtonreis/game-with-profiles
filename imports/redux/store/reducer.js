import cardsReducer from '../cards/reducer'
import {playingReducer} from '../playing'
import {currentPlayerReducer} from "../currentPlayer";
import {combineReducers} from "redux";


const rootReducer = combineReducers({
    cards: cardsReducer,
    playing: playingReducer,
    currentPlayerId: currentPlayerReducer,
});

export default rootReducer;