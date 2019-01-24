import React from 'react'
import {withStyles} from '@material-ui/core/styles';

const styles = {
    wrapper:{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
};

class LoginPage extends React.Component {

    render () {

        const {classes, playing} = this.props;

        return(
            <div>
                I am a login page
            </div>
        );
    };
}

LoginPage = withStyles(styles)(LoginPage);


// function mapStateToProps(state) {
//     return {
//         playing: selectIsPlaying(state),
//     }
// }

//Game = connect(mapStateToProps)(LoginPage);

export default LoginPage;