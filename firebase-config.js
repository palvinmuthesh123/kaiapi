var admin = require("firebase-admin");

var serviceAccount = require("./cred.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kais-9b303-default-rtdb.firebaseio.com"
})

module.exports.admin = admin