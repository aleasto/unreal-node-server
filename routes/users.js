var express = require('express');
var router = express.Router();

const TIMEOUT_SECONDS = 10;
const users = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query.id) {
    users[req.query.id] = Date.now();
  }

  res.json({ active: Object.keys(users).length });
});

setInterval(() => {
  let now = Date.now();
  for (let user in users) {
    if (now - users[user] >= TIMEOUT_SECONDS * 1000) {
      delete users[user];
    }
  }
}, TIMEOUT_SECONDS * 1000);

module.exports = router;
