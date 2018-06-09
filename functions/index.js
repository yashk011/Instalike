const functions = require('firebase-functions');

const SlackWebhook = require('slack-webhook');
const slack = new SlackWebhook('https://hooks.slack.com/services/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');


const Client = require('node-rest-client').Client;
const client = new Client();

exports.notifyOfNewUser = functions.database.ref('/users/{userId}')
  .onCreate((snapshot, context) => {
    const newUser = snapshot.val();
    console.log(newUser);
    slack.send(newUser);
  });


exports.addToFollowing = functions.database.ref('/follow/{initiatorUid}/{interestedInFollowingUid}')
  .onCreate((snapshot, context) => {
  const initiatorUid =  context.params.initiatorUid;
  const interestedInFollowingUid =  context.params.interestedInFollowingUid;
  const rootRef = snapshot.ref.root;
  let FollowingMeRef = rootRef.child('usersFollowingMe/' + interestedInFollowingUid + "/" + initiatorUid);
  return FollowingMeRef.set(true);
});


const sendLiveMessage = (messageToken, imageName) => {

  console.log('In send Live message', messageToken, imageName);

  const args = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "key=AAAA-fjIB_4:APA91bH_-1RfbcGZh_YZG_l8nspSkj9jvijaiCNBvnRFGUbMg4andpnxY-ht72HWJE2L7-YNJvpW1i1mBh_xK9mnvFfsbd_nbsp6ibETneo3FLdGp8b5HtIBeq1UD9qwkcscPETt_AYW"

    },
    data: {
      to: messageToken,
      notification: {
        title: "Congratulations!!",
        body: `Your image ${imageName} has been favorited`
      }

    }
  };

  client.post("https://fcm.googleapis.com/fcm/send", args, (data, response) => {
    console.log(data);
    console.log(response);
  });


};


exports.notifyWhenImageIsFavorited = functions.database.ref('/images/{images}')
  .onUpdate((change, context) => {
      if (change.before.exists()) {
        return null;
      }
      // Exit when the data is deleted.
      if (!change.after.exists()) {
        return null;
      }
    const imageData = context.params.images;

    if (imageData.oldFavoriteCount < imageData.favoriteCount) {

      const uploadedBy = imageData.uploadedBy;
      const rootRef = change.ref.root;
      rootRef.child('/users/'+ uploadedBy.uid).once('value')
        .then(snapshot => {
          const user = snapshot.val();
          const messageToken = user.messageToken;
          sendLiveMessage(messageToken, imageData.name);

        })
        .catch(error => {
          console.log(error);
        });

        const imageRef = rootRef.child('/images/' + imageData.name + "/oldFavoriteCount");
        return imageRef.set(imageData.favoriteCount);

    }
    
  });
