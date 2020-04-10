import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const REGION = 'us-east4';
const TIME_ZONE = 'America/New_York';

const USER_ID = 'ContentBot';

function getDateStrings(dateObj: Date) {
  const month = dateObj.getMonth() + 1;
  const fullMonth = month < 10 ? `0${month}` : month.toString();
  const date = dateObj.getDate();
  const fullDate = date < 10 ? `0${date}` : date.toString();
  const fullYear = dateObj.getFullYear();
  const year = fullYear.toString().substr(2, 2);

  return { month, date, year, fullMonth, fullDate, fullYear };
}

async function incrementPostCount(category: string) {
  await admin
    .firestore()
    .collection('categories')
    .doc(category)
    .set(
      {
        postCounter: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );
}

export const postDailyReadings = functions
  .region(REGION)
  .pubsub.schedule('0 6 * * *')
  .timeZone(TIME_ZONE)
  .onRun(async () => {
    console.log('posting daily readings');
    const dateObj = new Date();
    const dateStrings = getDateStrings(dateObj);

    const userId = USER_ID;
    const category = 'Daily Readings';
    const title = `Daily Readings for ${dateStrings.month}/${dateStrings.date}/${dateStrings.fullYear}`;
    const createdDate = dateObj;
    const lastActionDate = dateObj;
    const linkType = 1;
    const url = `http://usccb.org/bible/readings/${dateStrings.fullMonth}${dateStrings.fullDate}${dateStrings.year}.cfm`;
    const text = 'Post your reflections in the comments below';
    const dailyReadingsPost = {
      userId,
      category,
      title,
      createdDate,
      lastActionDate,
      linkType,
      url,
      text,
    };

    await admin
      .firestore()
      .collection('posts')
      .add(dailyReadingsPost)
      .then(() => {
        return incrementPostCount(category);
      });
  });

export const postWeeklyPrayers = functions
  .region(REGION)
  .pubsub.schedule('0 6 * * 0')
  .timeZone(TIME_ZONE)
  .onRun(async () => {
    console.log('posting weekly prayer requests');
    const dateObj = new Date();
    const dateStrings = getDateStrings(dateObj);

    const userId = USER_ID;
    const category = 'Prayer Requests';
    const title = `Prayer Requests for the week of ${dateStrings.month}/${dateStrings.date}/${dateStrings.fullYear}`;
    const createdDate = dateObj;
    const lastActionDate = dateObj;
    const text = 'Share your needs and intentions in the comments below';
    const weeklyPrayerPost = {
      userId,
      category,
      title,
      createdDate,
      lastActionDate,
      text,
    };

    await admin
      .firestore()
      .collection('posts')
      .add(weeklyPrayerPost)
      .then(() => {
        return incrementPostCount(category);
      });
  });
