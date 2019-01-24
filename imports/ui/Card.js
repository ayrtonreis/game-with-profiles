import React from 'react'
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames'
import {testingAction, cardClicked} from '../redux/cards/action'
import {colors} from '../utils'

const styles = theme => ({
    card: {
        height: '60px',
        width: '100%'
    },
    cardRed: {
        backgroundColor: '#ff5451',
    },
    cardGreen: {
        backgroundColor: '#3e913d',
    },
    cardBlue: {
        backgroundColor: '#326ca3',
    },
    cardYellow: {
        backgroundColor: '#d3c32a',
    },
    cardEmpty:{
        backgroundColor: 'rgba(128,128,128,0.4)',
    },
    gender: {
        textAlign: 'center',
    },
    number: {
        textAlign: 'center',
        fontSize: '22px',
        color: 'white'
    }
});

let Card = ({
                color,
                gender,
                number=0,
                pileType,
                pileIndex = null,
                classes,
                onClick,
                cardOwnerId,
    }) => {

    const mapClasses = {
        [colors.red]: classes.cardRed,
        [colors.green]: classes.cardGreen,
        [colors.blue]: classes.cardBlue,
        [colors.yellow]: classes.cardYellow,
        empty: classes.cardEmpty,
    };

    const classColor = mapClasses[color] ? mapClasses[color] : mapClasses['empty'];

    return(
        <button onClick={onClick} className={classNames(classes.card, classColor)}>
            <div className={classes.gender}>{gender}</div>
            <div className={classes.number}>{number}</div>
        </button>
    );
};

Card = withStyles(styles)(Card);


function mapDispatchToProps(dispatch, ownProps){
    const {cardOwnerId, pileType, pileIndex} = ownProps;
    return{
        onClick: () => {console.log(ownProps); dispatch(cardClicked(cardOwnerId, pileType, pileIndex))}
    }
}

Card = connect(null, mapDispatchToProps)(Card);

export default Card;