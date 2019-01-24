import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import DutchPile from './DutchPile'

const styles = {
    dutchSpace: {
        backgroundColor: '#ff9578',
        margin: '8px',
        gridColumn: '1/3',
        minHeight: '100px',

        display: 'grid',
        gridGap: '4px',
        padding: '10px',
        gridTemplateColumns: 'repeat(10, 1fr)'
    },
};

let DutchSpace = ({classes}) => {
    return(
        <div className={classes.dutchSpace}>
            {Array(20).fill().map((v,index) => <DutchPile card={1} key={index} pileIndex={index}/>)}
        </div>
    );
};

DutchSpace = withStyles(styles)(DutchSpace);


export default DutchSpace;