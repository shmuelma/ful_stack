//const FirebaseAuth = require('firebaseauth'); // or import FirebaseAuth from 'firebaseauth';
//const firebase = new FirebaseAuth('AIzaSyDNSyiuGnIHjovzVtLVzmfcqBq6yaHvz-U' );
////////////////////////////////////////////

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-api-9a206..firebaseio.com"
});
const db = admin.firestore();
const incriment=admin.firestore.FieldValue.increment(1);

//const {signIn, signUp} = require('./auth')




//sign+login
/*
app.post('/register',(req,res)=>{
    let {email,password} = req.body;
    firebase.registerWithEmail(email, password, function(err, result) {
        if (err)
            res.status(400).send(err)
        else
            res.status(200).send(result)
    });
});
app.post('/login',(req,res)=>{
    let {email,password} = req.body;
    firebase.signInWithEmail(email, password, function(err, result){
        if (err)
            res.status(400).send(err)
        else
            res.status(200).send(result)
    });
});
//app.post('/signup',firebase.registerWithEmail(email, password, function(err, result) {
//	if (err)
//		console.log(err);
//	else
//		console.log(result);
//}));
*/
/////////////////////////////////////

app.post('/api/create', (req, res) => {
    (async () => {
        try {
        // Generate an id - check in Firebase how to use an incremental id
        // If not possible - generate an id
          await db.collection('items').doc(`${Math.random()}`)
              .create({item: req.body.item});
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

app.get('/api/read/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('items').doc(req.params.item_id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// read all
app.get('/api/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('items');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    item: doc.data().item
                };
                response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// update
app.put('/api/update/:item_id', (req, res) => {
(async () => {
    try {
        const document = db.collection('items').doc(req.params.item_id);
        await document.update({
            item: req.body.item
        });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

// delete
app.delete('/api/delete/:item_id', (req, res) => {
(async () => {
    try {
        const document = db.collection('items').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

exports.app = functions.https.onRequest(app);