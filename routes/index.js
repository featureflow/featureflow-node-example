var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.featureflow.evaluate('node-demo-feature', req.ffUser).isOn()){
    return res.render('indexExampleFeature', {
      title: 'Featureflow Simple Example',
      description: 'node-demo-feature is ' + req.featureflow.evaluate('node-demo-feature', req.ffUser).value()
    });
  }
  res.render('index', {
      title: 'Featureflow Simple Example',
      description: 'node-demo-feature is ' + req.featureflow.evaluate('node-demo-feature', req.ffUser).value()
  });
});

module.exports = router;
