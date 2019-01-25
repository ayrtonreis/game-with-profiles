import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

export default BotsCollection = new Mongo.Collection('bots');

Meteor.methods({
    'tasks.insert'({text, priority}) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        BotsCollection.insert({
            text,
            priority,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
            deleted: false
        });
    }
});

// if (Meteor.isServer) {
//     // This code only runs on the server
//     // Only publish tasks that are public or belong to the current user
//     Meteor.publish('bots', function botsPublication() {
//         return Bots.find({
//             deleted: {$ne: true},
//             $or: [
//                 { private: { $ne: true } },
//                 { owner: this.userId },
//             ],
//         });
//     });
// }