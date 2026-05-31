// Import the framework and instantiate it
const Fastify = require('fastify');
const Database = require('./db');
const path = require('path');

const fastify = Fastify({
  logger: true
});

const db = process.env.DATABASE_URL ? new Database(process.env.DATABASE_URL) : null;

// Declare a route
fastify.get('/', async function handler(request, reply) {
  if (!db) {
    fastify.log.error({ msg: 'Request failed: DATABASE_URL environment variable is not set', url: request.url, method: request.method });
    return reply.code(500).send({ error: 'Internal server error' });
  }
  try {
    const currentTime = await db.getCurrentTime();
    const version = await db.getVersion();
    console.log("just a log line", currentTime, version)
    return { hello: 'world', currentTime, version, magic_number: 1 };
  } catch (err) {
    reply.code(500).send({ error: 'Database query failed' });
  }
});

(async () => {
  try {
    if (db) {
      await db.connect();
    }

    // Run the server!
    console.log("Server is running on port 3000");
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
