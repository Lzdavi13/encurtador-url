import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { linkService } from "../factory/linkService.factory";
import { CreateLinkDto } from "../interfaces/CreateLink.dto";


export async function linkRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateLinkDto }>('/', async (request, reply) => {
    try {
      const { code, url } = request.body

      const createdLink = await linkService.create({ code, url })

      return reply.code(201).send({ shortLinkId: createdLink.id })
    } catch (error) {
      if (error instanceof ZodError) {
        const [_error] = JSON.parse(error.message)

        return reply.code(400).send({ status_code: 400, code: _error.code, message: _error.message })
      }

      return reply.code(500).send({ status_code: 500, message: 'Internal server errror' })
    }
  })
}