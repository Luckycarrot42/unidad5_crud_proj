const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors') 
const app = express();
app.use(cors({ origin: true}));

app.get ('/patients', async (req, res) => {
  const patients = await admin.firestore().collection('patients').get()
  const list = []
  patients.docs.forEach(doc => {
    list.push({
      id: doc.id,
      data: doc.data()
    })
  })
  res.send(list)
})

app.get('/patients/:id', async (req, res) => {
  const patient = await admin.firestore().collection('patients')
  .doc(req.params.id).get().then((doc) => {
    if(doc.exists) {
      return {
        id: doc.id,
        data: doc.data()
      }
    }else{
      return {}
    }
  })
  res.send(patient)
})

//crear paciente
app.post('/patients', async (req,res) => {
  const patient = await admin.firestore().collection('patients').add(req.body)
  .then((doc) => {
    return doc.id
  })
  res.send(patient)
})

app.delete('/patients/:id', async (req, res) => {
  const patient = await admin.firestore().collection('patients')
  .doc(req.params.id).delete();
  res.send(patient)
})

app.put('/patients/:id', async (req, res) => {
  const patient = await admin.firestore().collection('patients')
  .doc(req.params.id).update(req.body).then(function (doc) {
    return doc.id
  })
  res.send(patient)
})

exports.api = functions.https.onRequest(app)