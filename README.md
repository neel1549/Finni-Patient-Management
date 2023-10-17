# Finni-Patient-Management

## To Run:

Open two terminal tabs(one for FE, one for BE)


### FE: `` cd ui && npm start ``
### BE: ``` cd api && node app.js ```


Visit http://localhost:3000 on your local browser and interact with the website!

Basic Architecture:
The UI uses the Firebase SDK to create users and obtain an auth token from Firebase Auth. We then use the token to make all other API requests to the backend that Node JS middleware validates.
There are a couple endpoints configured in Node JS

#### app.post("/user")
####  app.get("/patients")
####  app.put("/patient/:id")
####  app.post("/patient")
####  app.delete("/patient/:id"

We use two tables in Firestore, Patients and Users with the following schemas

#### Patient
firstName: string;
middleName: string;
lastName: string;
status: string;
email: string;
address: string;
phoneNumber: string;
providerId: string;
patientId?: string;
profilePhoto?: File;
additionalFields?: {};

#### NewUser
email: string;
uid: string;

We have also implemented filters that do same text equality search.
<img width="1440" alt="Screen Shot 2023-10-16 at 11 52 30 PM" src="https://github.com/neel1549/Finni-Patient-Management/assets/17261580/12e124eb-e1bf-4080-9f3e-4fd154248a4d">





