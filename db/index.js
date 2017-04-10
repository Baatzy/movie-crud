const env = 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

const sql = knex('movies').toString();

console.log(sql);

knex.destroy();
