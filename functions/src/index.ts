import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const postDailyReadings = functions.pubsub
  .schedule('30 12 * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    console.log('posting daily readings');
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const year = now.getFullYear().toString().substr(2, 2);

    const title = `Daily Readings for ${month}/${date}/${year}`;
    const createdDate = now;
    const lastActionDate = now;
    const linkType = 1;
    const url = `https://usccb.org/bible/readings/${month}${date}${year}.cfm`;
    const dailyReadingsPost = {
      title,
      createdDate,
      lastActionDate,
      linkType,
      url,
    };

    await admin.firestore().collection('posts').add(dailyReadingsPost);
  });
