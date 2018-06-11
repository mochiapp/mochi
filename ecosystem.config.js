module.exports = {
  apps: [{
    name: 'mochiapp',
    script: './server/src/index.js'
  }],
  deploy: {
    staging: {
      user: 'ubuntu',
      host: 'ec2-18-216-197-134.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/mochiserver.pem',
      ref: 'origin/server.setup',
      repo: 'git@github.com:mochiapp/mochi.git',
      path: '/home/ubuntu/projects/mochi',
      'post-deploy': 'cd app/ && yarn && quasar build && cd ../server/ && yarn && pm2 startOrRestart ../ecosystem.config.js'
    }
  }
}
