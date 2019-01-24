import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Card from './Card'
import pileTypes from "../pileTypes";
import {emptyCardObj} from '../utils'
import {selectLastCardInDutchPile} from "../redux/cards/selector";
import {connect} from "react-redux";

const styles = theme => ({
    dutchPile: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: '60px'
    },
});

//pileType={pileTypes.DUTCH_PILE}
let DutchPile = ({classes, card, pileIndex}) => {
    return(
        <div className={classes.dutchPile}>
            <Card pileType={pileTypes.DUTCH_PILE}
                  pileIndex={pileIndex}
                  color={card.color}
                  gender={card.gender}
                  number={card.number}
            />
        </div>
    );
};

DutchPile = withStyles(styles)(DutchPile)

function mapStateToProps(state, {pileIndex}){
    return {
        card: selectLastCardInDutchPile(state, pileIndex)
    };
}

DutchPile = connect(mapStateToProps)(DutchPile);

export default DutchPile;