var admin = require("firebase-admin");
var serviceAccount = require("./finni-79a54-firebase-adminsdk-4az0u-276bdfc7a0.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

module.exports = admin;
