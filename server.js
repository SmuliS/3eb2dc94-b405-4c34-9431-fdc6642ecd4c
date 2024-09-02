// Import the framework and instantiate it
const Fastify = require('fastify');
const Database = require('./db');
const path = require('path');

const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', async function handler(request, reply) {
  try {
    const currentTime = await db.getCurrentTime();
    const version = await db.getVersion();
    return { hello: 'world', currentTime, version };
  } catch (err) {
    reply.code(500).send({ error: 'Database query failed' });
  }
});

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const db = new Database(process.env.DATABASE_URL);

(async () => {
  try {
    await db.connect();

    // Run the server!
    console.log("Server is running on port 3000");
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();