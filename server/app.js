const express = require("express");
const cors = require("cors");
const admin = require("./admin");
const middleware = require("./middleware");
var multer = require("multer");
var upload = multer();
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

// for parsing multipart/form-data
app.use(upload.single("profilePhoto"));
app.use(express.static("public"));

const db = admin.firestore();

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", async (req, res) => {
  const db = admin.firestore();
  let customerRef = db.collection("Users");
  let test = customerRef.doc(req.body.uid);
  test
    .set({
      uid: req.body.uid,
      email: req.body.email,
    })
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      res.send("Error in User Creation %v", err);
    });
});

app.get("/patients", async (req, res) => {
  let patients = [];
  let patientRef = db.collection("Patients");
  console.log(req.query.providerId);
  patientRef
    .where("providerId", "==", req.query.providerId)
    .get()
    .then((querySnapshot) => {
      patients = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      res.json(patients);
    });
  console.log(patients);
});

app.put("/patient/:id", async (req, res) => {
  console.log(req.body);
  let patientCollection = db.collection("Patients");
  var patientId = req.params.id;
  let test = patientCollection
    .doc(patientId)
    .set({ ...req.body })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json(e.message);
    });
});

app.post("/patient", async (req, res) => {
  var imageUrl = "";
  // if (req.body.profilePhoto != null) {
  //   const bucket = admin.storage().bucket();
  //   bucket.upload('/profile_photos/',)
  // }
  console.log(req.profilePhoto);
  console.log("hello");
  let patientCollection = db.collection("Patients");

  const patientId = uuidv4();
  req.body["patientId"] = patientId;

  console.log(req.body);
  let test = patientCollection
    .doc(patientId)
    .set({ ...req.body })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((e) => {
      res.json(e.message);
    });
});
app.delete("/patient/:id", async (req, res) => {
  var patientId = req.params.id;
  console.log(patientId);
  let patientCollection = db.collection("Patients");
  patientCollection
    .where("patientId", "==", patientId)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.length == 0) {
        res.send("No patients to delete!");
        return;
      }
      querySnapshot.forEach(async function (doc) {
        res.json(await doc.ref.delete());
      });
    })
    .catch((e) => res.json(e.message));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
