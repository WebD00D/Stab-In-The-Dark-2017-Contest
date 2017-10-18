var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");
var createsend = require('createsend-node');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8082, function() {
  console.log("Listening on port 8082!");
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyClVUDaals4XX2qCox561okBfZRXDNUZ4o",
  authDomain: "stabinthedark2017.firebaseapp.com",
  databaseURL: "https://stabinthedark2017.firebaseio.com",
  projectId: "stabinthedark2017",
  storageBucket: "stabinthedark2017.appspot.com",
  messagingSenderId: "687257526210"
};
firebase.initializeApp(config);

app.use("/static/css", express.static(__dirname + "/static/css"));
app.use("/static/scss", express.static(__dirname + "/static/scss"));
app.use("/static/js", express.static(__dirname + "/static/js"));
app.use("/static/img", express.static(__dirname + "/static/img"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


// LOGIC
app.post("/sumbit-email", function(request, res) {
  var email = request.body.email;
  var social = request.body.social;
  var hemisphere = request.body.hemisphere;

  var timeStamp = Date.now();

  var auth = { apiKey: '5ef190df52ba3c10200e220f817661b9' }; // TEST ACCOUNT
  //var auth = { apiKey: '09686596862e7008d4d49fb8ce5a8bded64d359a8a45df28' }; // STAB ACCOUNT
  var api = new createsend(auth);

  var listId = '0188d736f819fa4c65f089b35c1ec5dd' // TEST ACCOUNT
//  var listId = '156a30d6a56115c00bd7f615fef14bab' // STAB ACCOUNT

  var details = {
    EmailAddress: email
  };

  api.subscribers.addSubscriber(listId, details, (err, res) => {
    if (err) console.log(err);
  });

  firebase
    .database()
    .ref("readers/" + timeStamp)
    .set({
      email: email,
      social: social,
      hemisphere: hemisphere
    });

  res.end("successful");
});

app.post("/sumbit-survey", function(request, res) {
  var email = request.body.email;
  var shaper = request.body.shaper;
  var hemisphere = request.body.hemisphere;
  var social = request.body.social;
  var timeStamp = Date.now();

  if ( hemisphere === "Northern") {
    firebase
      .database()
      .ref("responses/" + shaper + "/" + timeStamp)
      .set({
        email: email,
        social: social
      });
  } else {
    firebase
      .database()
      .ref("southern-hemisphere-responses/" + shaper + "/" + timeStamp)
      .set({
        email: email,
        social: social
      });
  }

  res.end("successful");
});

app.post("/shared-list", function(request, res) {
  var email = request.body.email;
  var hemisphere = request.body.hemisphere;
  var social = request.body.social;
  var type = request.body.type;
  var timeStamp = Date.now();

  if ( hemisphere === "Northern") {
    firebase
      .database()
      .ref("shared/" + timeStamp)
      .set({
        email: email,
        social: social,
        type: type,
      });
  } else {
    firebase
      .database()
      .ref("southern-shared/" + timeStamp)
      .set({
        email: email,
        social: social,
        type: type
      });
  }

  res.end("successful");
});
