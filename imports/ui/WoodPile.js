import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Card from './Card'
import pileTypes from "../pileTypes";
import {cardClicked} from "../redux/cards/action";
import {connect} from "react-redux";
import {emptyCardObj} from "../utils";
import {selectLastCardInWoodPile} from "../redux/cards/selector";

const styles = theme => ({
    woodPile: {

    },
});

let WoodPile = ({classes, cardOwnerId, card}) => {
    return(
        <div className={classes.woodPile}>
            <Card
                cardOwnerId={cardOwnerId}
                pileType={pileTypes.WOOD_PILE}
                color={card.color}
                gender={card.gender}
                number={card.number}
            />
        </div>
    );
};

WoodPile = withStyles(styles)(WoodPile);

function mapStateToProps(state, {cardOwnerId}){

    return {
        card: selectLastCardInWoodPile(state, cardOwnerId)
    }
}

WoodPile = connect(mapStateToProps)(WoodPile);

export default WoodPile;