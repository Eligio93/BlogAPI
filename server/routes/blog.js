var express = require('express');
var router = express.Router();

/* GET  blog home page. */
router.get('/', function(req, res, next) {
  res.json({message:'Welcome to my blog'});
});

module.exports = router;
