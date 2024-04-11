import * as dotenv from "dotenv"
import Fastify from "fastify"
import { linkRoutes } from "./routes/link.routes"

dotenv.config()
const app = Fastify()

app.register(linkRoutes)

export { app }
