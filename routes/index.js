var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.featureflow.evaluate('example-feature', req.ffContext).is('beta')){
    res.render('indexbeta', { title: 'FF BETA' });
  }
  res.render('index', { title: 'FF' });
});

module.exports = router;
