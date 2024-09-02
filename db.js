const { Client } = require('pg');
const parsePgConnectionString = require('pg-connection-string').parse;

class Database {
  constructor(connectionString) {
    const pgConfig = parsePgConnectionString(connectionString);
    this.client = new Client({
      user: pgConfig.user,
      password: pgConfig.password,
      host: pgConfig.host,
      port: pgConfig.port,
      database: pgConfig.database,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error('Error connecting to the database', err.stack);
      throw err;
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log("Disconnected from the database");
    } catch (err) {
      console.error('Error disconnecting from the database', err.stack);
      throw err;
    }
  }

  async getCurrentTime() {
    const res = await this.client.query('SELECT NOW() as now');
    return res.rows[0].now;
  }

  async getVersion() {
    const res = await this.client.query('SELECT version() as version');
    return res.rows[0].version;
  }
}

module.exports = Database;