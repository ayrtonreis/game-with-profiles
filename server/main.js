import { Meteor } from 'meteor/meteor';
import BotsCollection from '/imports/api/bots';

function insertBot({id: _id, name, avatar, speedLevel, visionLevel}) {
    BotsCollection.insert({ _id, name, avatar, speedLevel, visionLevel, createdAt: new Date() });
}

Meteor.startup(() => {
  //If the Bots collection is empty, add some data.
  if (BotsCollection.find().count() === 0) {
      
    insertBot({
        id: 'bot1',
        name: 'Silly Bot',
        avatar: '02',
        speedLevel: 1,
        visionLevel: 2,
    });
      insertBot({
          id: 'bot2',
          name: 'Smart Bot',
          avatar: '01',
          speedLevel: 4,
          visionLevel: 4,
      });
      insertBot({
          id: 'bot3',
          name: 'Genius Bot',
          avatar: '06',
          speedLevel: 5,
          visionLevel: 5,
      });
      insertBot({
          id: 'bot4',
          name: 'Friendly Bot',
          avatar: '04',
          speedLevel: 2,
          visionLevel: 3,
      });
  }
    Meteor.publish("userInfo", function (userId) {
        try{
            return Meteor.users.find({_id: this.userId}, {fields: {
                    '_id': true,
                    'name': true,
                    'nickname': true,
                    'createdAt': true,
                    'userAvatar': true,
                    'favoriteBots': true,
                    'emails': true,
                }});
        }catch(error){
            console.log(error);
        }
    });

});
