import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Redirect, Link } from "react-router-dom";
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {Avatar} from "@material-ui/core/umd/material-ui.production.min";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    avatar:{
        width: '25px',
        height: '25px',
        marginRight: '10px'
    }
};

class MenuAppBar extends React.Component {
    constructor(props){
        super(props);

        //this.state = {goToProfile: false};
        //this.handleMenu = this.handleMenu.bind(this);
    }

    static defaultProps = {
        goBackTo: null,
        showProfileAvatar: false,
    };

    // handleMenu(){
    //     this.setState({
    //         goToProfile: true
    //     })
    // };

    goBackLink(){

        if(this.props.goBackTo){
            const { classes } = this.props;

            return(
                <Link to={this.props.goBackTo}>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
            );
        }
        else
            return '';
    }

    profileLink(){

        if(this.props.showProfileAvatar){
            const { classes } = this.props;


            return(
                <Link to='/profile'>
                    {this.props.userAvatar ?
                        <Avatar src={`avatars/${this.props.userAvatar}.png`} className={this.props.classes.avatar} />
                        :
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            // onClick={this.handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    }
                </Link>
            );
        }
        else
            return '';
    }

    render() {
        // if (this.state.goToProfile === true) {
        //     return <Redirect to='/another' />
        // }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: "#ffb97c"}}>
                    <Toolbar>

                        {this.goBackLink()}

                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Dutch Blitz Game
                        </Typography>

                        {this.profileLink()}

                        <div><AccountsUIWrapper/></div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

MenuAppBar = withStyles(styles)(MenuAppBar)

MenuAppBar = withTracker(() => {
    Meteor.subscribe("userInfo");

    const user = Meteor.user();
    let userAvatar = null;


    if(user !== null){
        try {
            userAvatar = user.avatar;
        }
        catch (e) {}
    }

    return {
        userAvatar
    };
})(MenuAppBar);

export default MenuAppBar;