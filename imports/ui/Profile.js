import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Meteor} from "meteor/meteor";
import BotsCollection from "../api/bots";
import { withTracker } from 'meteor/react-meteor-data';
import TopBar from "./TopBar";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {Avatar} from "@material-ui/core/umd/material-ui.production.min";
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    avatar: {
        margin: '2px',
        width: '40px',
        height: '40px',
    },
    selectedAvatar:{
        backgroundColor: '#ff0000',
        outlineStyle: 'solid',
        outlineColor: '#000000',
    },
    userAvatarsWrapper: {
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        width: '200px',
    },
    buttonsWrapper: {
        marginTop: '20px',
    },
    button: {
        margin: '8px',
    }
};

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // favoriteBots: this.props.userFavBots,
            // userName: this.props.userName,
            // userEmail:this.props.userEmail,
            // userNickname: this.props.userNickname,
            // userAvatar : this.props.userAvatar,
            favoriteBots: [],
            userName: null,
            userEmail: null,
            userNickname: null,
            userAvatar: null,
        };

        this.toggleBot = this.toggleBot.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    static defaultProps = {
        userId: null,
        bots: [],
    };


    componentDidMount(){
        if(this.props.userName){
            this.setState({
                favoriteBots: this.props.userFavBots,
                userName: this.props.userName,
                userEmail:this.props.userEmail,
                userNickname: this.props.userNickname,
                userAvatar : this.props.userAvatar,
            });
        }
    }


    componentDidUpdate(prevProps){
        if(prevProps.userName !== this.props.userName){
            this.setState({
                favoriteBots: this.props.userFavBots,
                userName: this.props.userName,
                userEmail:this.props.userEmail,
                userNickname: this.props.userNickname,
                userAvatar : this.props.userAvatar,
            });
        }
    }

    checkUserLoggedIn(){
        return !(this.props.userId === null);
    }

    handleChange(field){
        return (event) => {
            this.setState({
                [field]: event.target.value,
            });
        }
    }

    handleSave(){
        Meteor.call('users.updateFavoriteBots', this.state.favoriteBots);
        Meteor.call('users.updateName', this.state.userName);
        Meteor.call('users.updateNickname', this.state.userNickname);

    }

    handleCancel(){
        this.setState({
            favoriteBots: this.props.userFavBots,
            userName: this.props.userName,
            userEmail:this.props.userEmail,
            userNickname: this.props.userNickname,
            userAvatar : this.props.userAvatar,
        });
    }

    toggleBot(botId) {
        return (event, checked) => {
            if (!checked) {

                const newArray = JSON.parse(JSON.stringify(this.state.favoriteBots));


                this.setState({favoriteBots: newArray.filter(id => id !== botId)})
            }
            else{

                const newArray = JSON.parse(JSON.stringify(this.state.favoriteBots));
                newArray.push(botId);
                this.setState({favoriteBots: newArray});
            }
        }
    }

    onFieldChange = field => event => {
        this.setState({
            [field]: event.target.value,
        });
    };

    render() {
        if(!this.checkUserLoggedIn())
            return(
                <TopBar goBackTo='/'/>
            );

        const favoriteBots = this.state.favoriteBots;
        const isMaxBotsSelected = (favoriteBots.length === 3);

        const headRows = [
            {id: 0, field: 'Avatar'},
            {id: 1, field: 'Name'},
            {id: 2, field: 'Speed Level'},
            {id: 3, field: 'Vision Level'},
        ];
        const bodyCols = this.props.bots;

        const userName = this.state.userName;
        const userEmail= this.state.userEmail;
        const userNickname = this.state.userNickname;
        const userAvatar  = this.state.userAvatar;

        return(
            <div>
                <TopBar goBackTo='/'/>

                <Grid container justify="center" alignItems="center" className={this.props.classes.userAvatarsWrapper}>
                    <div style={{gridRow: '1/3'}}>Picture: </div>
                    <Avatar src={`avatars/${'01'}.png`} className={this.props.classes.avatar} />
                    <Avatar src={`avatars/${'02'}.png`} className={this.props.classes.avatar} />
                    <Avatar src={`avatars/${'03'}.png`} className={this.props.classes.selectedAvatar} />
                    <Avatar src={`avatars/${'04'}.png`} className={this.props.classes.avatar} />
                    <Avatar src={`avatars/${'05'}.png`} className={this.props.classes.avatar} />
                    <Avatar src={`avatars/${'06'}.png`} className={this.props.classes.avatar} />
                </Grid>

                <div>
                    <TextField
                        disabled
                        id="userEmail"
                        label="Email"
                        value={this.state.userEmail || ''}
                        margin="normal"
                        variant="outlined"

                    />
                </div>

                <div>
                    <TextField
                        id="userName"
                        label="Name"
                        value={this.state.userName || ''}
                        onChange={this.handleChange('userName')}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div>
                    <TextField
                        id="userNickname"
                        label="NickName"
                        value={this.state.userNickname || ''}
                        onChange={this.handleChange('userNickname')}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            {/*<TableCell padding="checkbox">*/}
                            {/*<Checkbox*/}

                            {/*/>*/}
                            {/*</TableCell>*/}

                            <TableCell padding="checkbox">

                            </TableCell>

                            {headRows.map(
                                row => {
                                    return(
                                        <TableCell
                                            key={row.id}
                                            align='left'
                                            padding={row.disablePadding ? 'none' : 'default'}
                                            //sortDirection={orderBy === row.id ? order : false}
                                        >
                                            {row.field}
                                        </TableCell>
                                    );
                                }
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {bodyCols.map(
                            row => {
                                return(
                                    <TableRow key={row._id} >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={favoriteBots.includes(row._id)}
                                                disabled={isMaxBotsSelected && !favoriteBots.includes(row._id)}
                                                onChange={this.toggleBot(row._id)}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Avatar src={`avatars/${row.avatar}.png`} />
                                        </TableCell>
                                        <TableCell> {row.name} </TableCell>
                                        <TableCell> {row.speedLevel} </TableCell>
                                        <TableCell> {row.visionLevel} </TableCell>


                                    </TableRow>


                                );
                            }
                        )}
                    </TableBody>
                </Table>


                <div className={this.props.classes.buttonsWrapper}>
                    <Button
                        variant="contained"
                        className={this.props.classes.button}
                        onClick={this.handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={this.props.classes.button}
                        onClick={this.handleCancel}
                    >
                        Cancel
                    </Button>
                </div>

            </div>

        );
    }
}

Profile = withStyles(styles)(Profile);


Profile = withTracker(() => {
    Meteor.subscribe("userInfo");
    Meteor.subscribe("bots");

    let userId, userEmail, userName, userNickname, userAvatar;
    let userFavBots = [];
    let bots = [];
    const user = Meteor.user();

    if(user === null){
       userId = null;
    }

    try {
        userId = user._id;
        bots = BotsCollection.find({}, { sort: { _id: 1 } }).fetch();
        //console.log(bots);
        userName = user.name;
        userEmail = user.emails[0].address;
        userNickname = user.nickname;
        userAvatar = user.avatar;

        userFavBots = user.favoriteBots || [];

    }
    catch (e) {}

    return {
        userId: userId,
        userEmail,
        userName,
        userNickname,
        userAvatar,
        userFavBots,
        bots,
    };
})(Profile);

export default Profile;