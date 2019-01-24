import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Card from './Card'
import pileTypes from "../pileTypes";
import {connect} from "react-redux";
import {emptyCardObj} from '../utils'
import {
        selectLastCardInLeftPostPile,
        selectLastCardInMiddlePostPile,
        selectLastCardInRightPostPile,
        } from "../redux/cards/selector";

const styles = theme => ({
    postPile: {
        gridColumn: '2/5',
        display: 'grid',
        gridGap: '2px',
        gridTemplateColumns: 'repeat(3, 1fr)'
    },
});

let PostPile = ({
                    classes,
                    cardOwnerId,
                    left,
                    middle,
                    right
    }) => {

    return(
        <div className={classes.postPile}>
            <Card  cardOwnerId={cardOwnerId}
                   pileType={pileTypes.LEFT_POST_PILE}
                   color={left.color}
                   gender={left.gender}
                   number={left.number}
            />
            <Card  cardOwnerId={cardOwnerId}
                   pileType={pileTypes.MIDDLE_POST_PILE}
                   color={middle.color}
                   gender={middle.gender}
                   number={middle.number}
            />
            <Card  cardOwnerId={cardOwnerId}
                   pileType={pileTypes.RIGHT_POST_PILE}
                   color={right.color}
                   gender={right.gender}
                   number={right.number}
            />
        </div>
    );
};

PostPile = withStyles(styles)(PostPile);

function mapStateToProps(state, {cardOwnerId}) {

    return {
        left: selectLastCardInLeftPostPile(state, cardOwnerId),
        middle: selectLastCardInMiddlePostPile(state, cardOwnerId),
        right: selectLastCardInRightPostPile(state, cardOwnerId),
    }
}

PostPile = connect(mapStateToProps)(PostPile);

export default PostPile;