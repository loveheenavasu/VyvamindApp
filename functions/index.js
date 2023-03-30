const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

// exports.scheduledFunction = functions.pubsub
//   .schedule('every 5 minutes')
//   .onRun(context => {
//     console.log('This will be run every 5 minutes!');
//     return null;
//   });

// exports.Check = functions.pubsub.schedule('every 5 minutes').onRun(context => {
//   console.log('This will be run every 5 minutes!');

//   return 'hello';
// });

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  admin
    .firestore()
    .collection('Users')
    .onSnapshot(documentSnapshot => {
      const newData = documentSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log('------newData--->', newData);
      for (let index = 0; index < newData.length; index++) {
        let mUserTime = newData[index]?.time;

        var timestemp = new Date(mUserTime?.toDate());
        // var formatted = timestemp.format("dd/mm/yyyy hh:MM:ss");
        console.log('-----mUserTime----->', timestemp.getDate());
      }
    });
  response.send('Hello from Firebase!');
});
