const express = require("express");
const twilio = require("twilio");
const credentials = require("./credentials.json");

const app = express();
const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.get("/token", function(req, res) {
  const token = new AccessToken(
    credentials.accountSid,
    credentials.apiSid,
    credentials.apiSecret,
    {
      identity: '6649a1185f559ffc',
      ttl: 40000
    }
  );

  const grant = new ChatGrant({ serviceSid: credentials.serviceSid });

  token.addGrant(grant);
  const tokenJwt = token.toJwt();
  console.log("token: " + tokenJwt);

  res.send(tokenJwt);
});

app.get("/", function(req, res) {
  res.sendFile("index.html", { root: __dirname });
});

app.use(express.static(__dirname));

var port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
