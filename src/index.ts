import fastify, { FastifyInstance } from "fastify"
import * as routes from "./routes"
import { db } from "./dbconfig"

db.migrate.latest({ directory: "dest/migrations" })

const server: FastifyInstance = fastify({})

server.get("/customers", {}, routes.get_customers)
server.post("/customers", {}, routes.post_customers)
server.post("/customers/:id/kpi", {}, routes.post_customers_kpi)

server.listen({ host: "0.0.0.0", port: 8080 }, (error) => {
    if (error) {
        server.log.error(error)
        process.exit(1)
    }
})
