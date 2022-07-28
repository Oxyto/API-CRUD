import dotenv from "dotenv"
import fastify, { FastifyInstance } from "fastify"
import * as routes from "./routes"
import { db } from "./dbconfig"

dotenv.config({ path: "../.env" })

db.migrate.latest({ directory: "dest/migrations" })

const server: FastifyInstance = fastify({})

server.get("/customers", {}, routes.getCustomers)
server.post("/customers", {}, routes.postCustomers)
server.post("/customers/:id/kpi", {}, routes.postCustomersKpi)

server.listen(
  { host: String(process.env.HOST_IP), port: Number(process.env.HOST_PORT) },
  (error) => {
    if (error) {
      server.log.error(error)
      process.exit(1)
    }
  }
)
