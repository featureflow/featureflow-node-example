var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let allFeatures = req.featureflow.evaluateAll(req.ffUser);
  if (req.featureflow.evaluate('node-demo-feature', req.ffUser).isOn()){
    return res.render('indexExampleFeature', {
      title: 'Featureflow Simple Example',
      description: 'node-demo-feature is ' + req.featureflow.evaluate('node-demo-feature', req.ffUser).value(),
      features: JSON.stringify(allFeatures)
    });
  }
  res.render('index', {
      title: 'Featureflow Simple Example',
      description: 'node-demo-feature is ' + req.featureflow.evaluate('node-demo-feature', req.ffUser).value(),
      features: JSON.stringify(allFeatures)
  });
});

module.exports = router;
