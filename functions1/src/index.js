const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
const { spawnSync, exec } = require('child_process');

const bodyParser = require('body-parser');

const Processor = require("./Processor");

// admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//       clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     }),
//   });

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const p = new Processor();
    p.initIndex();
});

app.post('/callPythonFunction', async (req, res) => {
    // Extract the script name from the request body
    // const { scriptName, input, textbook, userID } = req.body;
    console.log(req.body);
    const scriptName = req.body.scriptName;
    const input = req.body.input;
    const textbook = req.body.textbook;
    const userID = req.body.userID;

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

    console.log('Calling python script:', pythonScriptPath);
    exec('pwd', (err, stdout, stderr) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    exec('source ../../venv/bin/activate', (err, stdout, stderr) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(stdout);

        const result = spawnSync('python', [pythonScriptPath], {
            encoding: 'utf-8',
            input: JSON.stringify({input,textbook,userID}),
        });


        console.log("Checkiung result: ", result);
        if (result.error) {
            console.error(result.error);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result.stdout.trim());
    });

    // const output = JSON.parse(result.stdout.trim());
    // const answer = output.answer;
    // console.log(answer);

});

// module.exports = {
//     callPythonFunction
// }

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});