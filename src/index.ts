import fastify, { FastifyInstance } from "fastify"
import * as routes from "./routes"

const server: FastifyInstance = fastify({})

/* routes are defined below */
server.get("/customers", {}, routes.get_customers)
server.post("/customers", {}, routes.post_customers)
server.post("/customers/:id/kpi", {}, routes.post_customers_kdi)

server.listen({ port: 8080 }, (error) => {
    if (error) {
        server.log.error(error)
        process.exit(1)
    }
})
