import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as path from 'path';
import { spawnSync } from 'child_process';

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });

const app = express();

app.post('/callPythonFunction', async (req, res) => {
    // Extract the script name from the request body
    const { scriptName, input, textbook, userID } = req.body;

    // Validate that the scriptName is provided
    if (!scriptName) {
        res.status(400).send('Bad Request: Missing scriptName in the request body');
        return;
    }

    // const userData = await admin.firestore().collection('users').doc(userId).get();
    // if (!userData.exists) {
    //     res.status(404).send('User not found');
    //     return;
    // }
    // const user = userData.data();
    

    const pythonScriptPath = path.join(__dirname, 'AI', `${scriptName}.py`);
    //declare script name as one of the below names
    //AI_QA=AI question and answering
    //Process_PDF = submit pdf and haystack will process it into the vector data base

    const result = spawnSync('python3', [pythonScriptPath], {
        encoding: 'utf-8',
        input: JSON.stringify({input,textbook,userID}),
    });

    if (result.error) {
        console.error(result.error);
        res.status(500).send('Internal Server Error');
        return;
    }

    const output = JSON.parse(result.stdout.trim());
    const answer = output.answer;
    console.log(answer);

});

export const callPythonFunction = functions.https.onRequest(app);
