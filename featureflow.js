const promisify = require('promisify-node');
const Featureflow = promisify('featureflow-node-sdk');

module.exports = function(API_KEY){

  const withFeatures = [{
    key: 'node-demo-feature',
    failoverVariant:'off'
  }];

  const ffPromise = Featureflow.init({
    apiKey: API_KEY,
    withFeatures: withFeatures
  }).then(featureflow=>{
    console.log('Featureflow initialised');
    return featureflow;
  }).catch(err=>{
    console.log(err);
  });

  return function (req, res, next) {
    ffPromise.then(featureflow => {
      req.featureflow = featureflow;
      req.ffContext = {
        key: req.query.key,
        values: req.query
      };
      next();
    }).catch(err => {
      next(err);
    });
  }

}
