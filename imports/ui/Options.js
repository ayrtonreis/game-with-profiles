import React from 'react'
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {shuffleAndDealCards, resetCards} from "../redux/cards/action";
import {togglePlayPause, selectIsPlaying} from "../redux/playing";

const styles = theme => ({
    options: {
        backgroundColor: '#afafaf',
        padding: '10px',
    },
    button: {
        margin: '10px 8px',
        fontSize: '10px',
        width: '70px'
    },
});

let Options = ({classes, playing, dealCardsCallback, resetCallback, playPauseCallback}) => {
    return(
        <div className={classes.options}>
            <Button
                variant="contained"
                className={classes.button}
                onClick={resetCallback}
            >
                Reset
            </Button>
            <Button
                variant="contained"
                className={classes.button}
                onClick={dealCardsCallback}
            >
                Deal Cards
            </Button>
            <Button
                variant="contained"
                className={classes.button}
                onClick={playPauseCallback}
            >
                {playing
                    ? "Pause"
                    : "Play"
                }
            </Button>
        </div>
    );
};

Options = withStyles(styles)(Options);

function mapStateToProps(state) {
    return {
        playing: selectIsPlaying(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        playPauseCallback: () => dispatch(togglePlayPause()),
        dealCardsCallback: () => dispatch(shuffleAndDealCards()),
        resetCallback: () => dispatch(resetCards()),
    }
}

Options = connect(mapStateToProps, mapDispatchToProps)(Options);

export default Options