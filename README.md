# 3eb2dc94-b405-4c34-9431-fdc6642ecd4c

Simple [Node.js](https://nodejs.org/en) application, which uses [fastify](https://fastify.dev/) web framework. Implements the following endpoint.

```yaml
openapi: 3.1.0
info:
  title: Example API
  version: 1.0.0
paths:
  /:
    get:
      summary: Get current time from PostgreSQL
      operationId: index
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  hello:
                    type: string
                    example: world
                  currentTime:
                    type: string
                    format: date-time
                    example: '2024-12-18T07:34:35.357Z'
                  version:
                    type: string
                    example: 'PostgreSQL 16.6 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.3.1 20240913 (Red Hat 13.3.1-3), 64-bit'
              example:
                hello: world
                currentTime: '2024-12-18T07:34:35.357Z'
                version: 'PostgreSQL 16.6 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.3.1 20240913 (Red Hat 13.3.1-3), 64-bit'
```

## Required environment variables

`DATABASE_URL` = PostgreSQL connection string
