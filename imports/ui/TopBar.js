import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import { Redirect, Link } from "react-router-dom";
import AccountsUIWrapper from './AccountsUIWrapper.js';

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
};

class MenuAppBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {goToProfile: false};

        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu(){
        this.setState({
            goToProfile: true
        })
    };

    render() {
        // if (this.state.goToProfile === true) {
        //     return <Redirect to='/another' />
        // }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: "#ffb97c"}}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Photos
                        </Typography>

                        <div>
                            <Link to='/profile'>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    // onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Link>
                        </div>
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

export default withStyles(styles)(MenuAppBar);