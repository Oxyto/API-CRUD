import dotenv from "dotenv"
import fastify, { FastifyInstance } from "fastify"
import { db } from "./dbconfig"
import swagger from "@fastify/swagger"
import * as routes from "./routes"

dotenv.config({ path: "../.env" })

db.migrate.latest({ directory: "dest/migrations" })

const server: FastifyInstance = fastify({})

server.register(swagger, {
  swagger: {
    info: {
      title: "API CRUD Documentation",
      description: "The swagger documentation for API CRUD",
      version: "0.1.6",
    },
    host: `127.0.0.1:${process.env.HOST_PORT}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
})

server.register(async (server) => {
  server.get(
    "/customers",
    {
      schema: {
        description: "Get a list of customers",
        response: {
          200: {
            description: "Successfully get a list of customers",
            type: "array",
            items: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                lastname: {
                  type: "string",
                },
                birthdate: {
                  type: "string",
                  format: "date-time",
                },
                kpis: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      number_purchase: {
                        type: "number",
                      },
                      store: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    routes.getCustomers
  )

  server.post(
    "/customers",
    {
      schema: {
        description: "Create a new customer in the database",
        body: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            lastname: {
              type: "string",
            },
            birthdate: {
              type: "string",
              format: "date-time",
            },
          },
        },
        response: {
          201: {
            description: "Successfully created a new customer",
            type: "null",
          },
          400: {
            description: "Invalid or empty body request",
            type: "null",
          },
          500: {
            description: "Internal server error",
            type: "null",
          },
        },
      },
    },
    routes.postCustomers
  )

  server.post(
    "/customers/:id/kpi",
    {
      schema: {
        description: "Create a KPI for a customer",
        body: {
          type: "object",
          properties: {
            number_purchase: {
              type: "number",
            },
            store: {
              type: "string",
            },
          },
        },
        response: {
          201: {
            description: "Successfully created a KPI to a customer",
            type: "null",
          },
          400: {
            description: "Invalid customer ID or invalid body request",
            type: "null",
          },
          500: {
            description: "Internal server error",
            type: "null",
          },
        },
      },
    },
    routes.postCustomersKpi
  )
})

server.listen(
  { host: String(process.env.HOST_IP), port: Number(process.env.HOST_PORT) },
  (error) => {
    if (error) {
      server.log.error(error)
      process.exit(1)
    }
  }
)
