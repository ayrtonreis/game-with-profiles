import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Options from './Options'
import Field from './Field'
import Bots from './Bots'
import TopBar from './TopBar'
import {selectIsPlaying} from "../redux/playing";
import {connect} from 'react-redux';

const styles = {
    gameWrapper:{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    game: {
        display: 'grid',
        gridGap: '4px',
        padding: '10px',
        gridTemplateColumns: '100px 600px',
    },
};

class Game extends React.Component {

    render () {

        const {classes, playing} = this.props;

        return(
            <div>
                <TopBar/>
                <div className={classes.gameWrapper}>
                    <div></div>
                    <div className={classes.game}>
                        <Options />

                        <Field playing={playing} />

                        <Bots />
                    </div>
                </div>
            </div>
        );
    };
}

Game = withStyles(styles)(Game);

Game.propTypes = {}

function mapStateToProps(state) {
    return {
        playing: selectIsPlaying(state),
    }
}

Game = connect(mapStateToProps)(Game);

export default Game;
