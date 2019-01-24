export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';

export function togglePlayPause() {
    return {
        type: TOGGLE_PLAY_PAUSE,
    }
}

export function playingReducer(state = false, action) {

    if (action.type === TOGGLE_PLAY_PAUSE)
        return !state;

    return state;
}

export function selectIsPlaying(state) {
    return state.playing;
}