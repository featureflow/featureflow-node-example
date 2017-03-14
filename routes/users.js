var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.featureflow.evaluate('example-feature', req.ffContext).isOn()){
    res.render('usersv2', { title: 'Users Version 2' });
  }
  else{
    res.render('users', { title: 'Users' });
  }
});

module.exports = router;
