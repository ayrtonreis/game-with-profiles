import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

Meteor.methods({

    'users.updateFavoriteBots'(botsArray){

        //console.log("UPDATE BOTS WAS CALLED!");

        Meteor.users.update(this.userId, { $set: { favoriteBots: botsArray }});
    },
    'users.updateName'(name){

        //console.log("UPDATE NAME WAS CALLED!");

        Meteor.users.update(this.userId, { $set: { name }});
    },
    'users.updateNickname'(nickname){

        console.log("UPDATE NICKNAME WAS CALLED!");

        Meteor.users.update(this.userId, { $set: { nickname }});
    },
    'users.updateAvatar'(avatarId){

        //console.log("UPDATE AVATAR WAS CALLED!");

        Meteor.users.update(this.userId, { $set: { avatar: avatarId }});
    },
});