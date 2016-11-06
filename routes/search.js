var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('search', {first: '', last: '', email: '', phone1: '', phone2: '', comment: '', error: ''});
});

module.exports = router;