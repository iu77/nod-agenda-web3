var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/delete', function(req, res, next) {
  var phoneToRemove= req.query.phone;
  res.send("removing contact:" + phoneToRemove);
});

module.exports = router;
