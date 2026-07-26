var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let allFeatures = req.featureflow.evaluateAll(req.ffUser);

  // jsonValue() returns the evaluated variant's JSON config payload (set on the
  // variant in the Featureflow dashboard), or undefined if it has none / the
  // feature isn't configured - here it falls back to the 'off' failoverVariant.
  let exampleFeature = req.featureflow.evaluate('example-feature', req.ffUser);

  if (exampleFeature.isOn()){
    return res.render('indexExampleFeature', {
      title: 'Featureflow Simple Example',
      description: 'example-feature is ' + exampleFeature.value(),
      features: JSON.stringify(allFeatures),
      jsonFeature: JSON.stringify(exampleFeature.jsonValue())
    });
  }
  res.render('index', {
      title: 'Featureflow Simple Example',
      description: 'example-feature is ' + exampleFeature.value(),
      features: JSON.stringify(allFeatures),
      jsonFeature: JSON.stringify(exampleFeature.jsonValue())
  });
});

module.exports = router;
