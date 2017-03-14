const Featureflow = require('../featureflow-node-sdk');
const API_KEY = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OGM3M2MyNTBiNmY1YzAwMGE0ZWI1MDIiLCJhdXRoIjoiUk9MRV9FTlZJUk9OTUVOVCJ9.bZZ0zIPQPz9dXIwkfV6oUbnAVnMiBaRXZtiqoVIUYeYg6_VkIDi_zPJb6v63NG-mcopjEiY-6XDnDylC_XpNzQ';

const prom = new Promise((resolve, reject)=>{
  Featureflow.init(API_KEY, {withFeatures: [{key: 'hello', failoverVariant:'off'}]}, function(err, featureflow){
    if (err){
      return reject(err);
    }
    else{
      resolve(featureflow);
    }
  })
})

function featureflowExpress(req, res, next){
  prom.then(featureflow=>{
    req.featureflow = featureflow;
    req.ffContext = {
      key: req.query.key,
      values: req.query
    };
    console.log(JSON.stringify(req.ffContext, true, 4));
    next();
  }).catch(err=>{
    next(err);
  });
}

module.exports = featureflowExpress;