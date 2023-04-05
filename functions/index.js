const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.scheduledFunction = functions.pubsub
  .schedule('every 4 hours')
  // .schedule('every 5 minutes')
  .onRun(context => {
    console.log('This will be run every 4 hours!');
    admin
      .firestore()
      .collection('Users')
      .onSnapshot(documentSnapshot => {
        const newData = documentSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        for (let index = 0; index < newData.length; index++) {
          var timestemp = new Date(
            newData[index]?.startNotificationDate?.toDate(),
          );
          const currentTime = new Date().valueOf();
          const expiryTime = new Date(timestemp).valueOf();
          if (currentTime >= expiryTime) {
            console.log('---token-------->', newData[index].token);
            const payload = {
              token: newData[index].token,
              notification: {
                title: 'Vyvamind App',
                body: 'Your medicine about to run out. kindly purchase it, Ignore if already purchased  ',
              },
              data: {
                body: 'Your medicine about to run out. kindly purchase it, Ignore if already purchased  ',
                title: 'Vyvamind App',
              },
            };
            admin
              .messaging()
              .send(payload)
              .then(response => {
                console.log('Successfully sent message:', response);
                return {success: true};
              })
              .catch(error => {
                return {error: error.code};
              });
          } else {
            console.log('--Schedule-Job--inside--else---->', 2);
            console.log('not expired');
          }
        }
      });
    return 'hello';
  });
