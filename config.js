const { argv } = require('yargs');

exports.MONGODB = {
    uri: `mongodb://localhost:${argv.dbport || '27017'}/myapp-deal`,
    username: argv.db_username || 'DB_username',
    password: argv.db_password || 'DB_password',
};