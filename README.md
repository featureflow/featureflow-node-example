# featureflow-node-example

[![][dependency-img]][dependency-url]

> Example implementation with Express for featureflow-node-sdk

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

##Usage
 
```js
// in './app.js'
// replace with your Server Key from featureflow.io - the one starting 'srv-env-'
const API_KEY = 'srv-env-123';
```

Run the node app example app and browse to the standard http://localhost:3000/
 
```app.js``` shows us creating a basic middleware function to define the featureflow client at request time.

We subsequently register the Featureflow.ExpressClient middleware.

```routes\index.js``` Shows us evaluating a feature at request time.





[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png