import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export default BotsCollection = new Mongo.Collection('bots');

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