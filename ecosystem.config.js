module.exports = {
  apps: [{
    name: 'mochiapp',
    script: './server/src/index.js'
  }],
  deploy: {
    production: {
      user: 'root',
      host: '149.28.235.44',
      key: '~/.ssh/id_rsa.pub',
      port: '2022',
      ref: 'origin/server.setup',
      repo: 'git@github.com:mochiapp/mochi.git',
      path: '/var/www/mochi.social',
      'post-deploy': 'git checkout server.setup && cd app/ && yarn && quasar build && cd ../server/ && yarn && pm2 startOrRestart ../ecosystem.config.js'
    },
    staging: {
      user: 'ubuntu',
      host: 'ec2-18-216-197-134.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/mochiserver.pem',
      ref: 'origin/staging',
      repo: 'git@github.com:mochiapp/mochi.git',
      path: '/home/ubuntu/projects/mochi',
      'post-deploy': 'git checkout staging && cd app/ && yarn && quasar build && cd ../server/ && yarn && pm2 startOrRestart ../ecosystem.config.js'
    }
  }
}
