var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
