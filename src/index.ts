import fastify, { FastifyInstance } from "fastify"
import * as routes from "./routes"
import { db } from "./dbconfig"

db.migrate.latest({ directory: "dest/migrations" })

const server: FastifyInstance = fastify({})

server.get("/customers", {}, routes.getCustomers)
server.post("/customers", {}, routes.postCustomers)
server.post("/customers/:id/kpi", {}, routes.postCustomersKpi)

server.listen({ host: "0.0.0.0", port: 8080 }, (error) => {
  if (error) {
    server.log.error(error)
    process.exit(1)
  }
})
