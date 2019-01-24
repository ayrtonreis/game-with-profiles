import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Card from './Card'
import pileTypes from '../pileTypes'
import {connect} from "react-redux";
import {emptyCardObj} from '../utils'
import {selectLastCardInBlitzPile} from "../redux/cards/selector";

const styles = theme => ({
    blitzPile: {

    },
});

let BlitzPile = ({classes, cardOwnerId, card}) => {
    return(
        <div className={classes.blitzPile}>
            <Card cardOwnerId={cardOwnerId}
                  pileType={pileTypes.BLITZ_PILE}
                  color={card.color}
                  gender={card.gender}
                  number={card.number}
            />
        </div>
    );
};

BlitzPile = withStyles(styles)(BlitzPile);

function mapStateToProps(state, {cardOwnerId}) {

    return {
        card: selectLastCardInBlitzPile(state, cardOwnerId)
    }
}

BlitzPile = connect(mapStateToProps)(BlitzPile);

export default BlitzPile;