const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.PGDATABASE ?? 'acl',
});
pool.connect();

module.exports = pool;
