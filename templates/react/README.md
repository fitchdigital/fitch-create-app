# fitch-create-app

react template

## Development

`npm start` will kick start an instance of webpack-dev-server and an instance of an express server that can be used for api's or sockets.

## Production

`npm run build` will build a version to `/build` folder. you can run `npm run serve` to use the express server to statically serve the files.

## Integration with Heroku

This template is ready to integrate with heroku.

First create an nodejs app in heroku. Secondly, you need to setup Pipelines in the Bitbucket git repository. You also need to add 2 environment variables HEROKU_API_KEY and HEROKU_APP_NAME which are both used in `scripts/heroku/deploy.sh`.

Once that is done, deployments to `develop` branch start a deployment process automatically to heroku.
