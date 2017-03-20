var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.featureflow.evaluate('node-demo-feature', req.ffContext).isOn()){
    return res.render('indexExampleFeature', { title: 'FF Example Feature!' });
  }
  res.render('index', { title: 'FF' });
});

module.exports = router;
