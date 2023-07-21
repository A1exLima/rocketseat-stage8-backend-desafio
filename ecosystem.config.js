module.exports = {
  apps : [{
    name: "app",
    script: "./src/server.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}

//https://pm2.keymetrics.io/docs/integrations/heroku/