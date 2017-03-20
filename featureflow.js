const promisify = require('promisify-node');
const Featureflow = promisify('featureflow-node-sdk');

module.exports = function(API_KEY){

  const withFeatures = [{
    key: 'hello',
    failoverVariant:'off'
  }];

  const ffPromise = Featureflow.init({
    apiKey: API_KEY,
    withFeatures: withFeatures
  }).then(featureflow=>{
    console.log('Featureflow initialised');
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
      console.log(JSON.stringify(req.ffContext, true, 4));
      next();
    }).catch(err => {
      next(err);
    });
  }

}
