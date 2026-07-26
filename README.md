# featureflow-node-example

[![][dependency-img]][dependency-url]

> Example implementation with Express for featureflow-node-sdk

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

##Usage

Copy ```.env.example``` to ```.env``` and set ```FEATUREFLOW_API_KEY``` to your _Server Environment SDK Key_ from the API Keys link in featureflow.io - (the one starting 'srv-env-')

```bash
cp .env.example .env
```

Run the node example app and browse to the standard http://localhost:3000/

```bash
yarn install
yarn start
``` 
or run/debug via the "Launch Featureflow Example" configuration in your IDE (see ```.vscode/launch.json```)
 
```app.js``` shows us creating a basic middleware function to define the featureflow client at request time.

We subsequently register the Featureflow.ExpressClient middleware.

```routes\index.js``` Shows us evaluating a feature at request time.





[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png