import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { linkService } from "../factory/linkService.factory";
import { CreateLinkDto } from "../interfaces/CreateLink.dto";


export async function linkRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateLinkDto }>('/links', async (request, reply) => {
    try {
      const createdLink = await linkService.create(request.body)

      return reply.code(201).send({ shortLinkId: createdLink.id })
    } catch (error) {
      if (error instanceof ZodError) {
        const [_error] = JSON.parse(error.message)

        return reply.code(400).send({ status_code: 400, code: _error.code, message: _error.message })
      }

      return reply.code(500).send({ status_code: 500, message: 'Internal server errror' })
    }
  })

  app.get<{ Params: { code: string } }>('/:code', async (request, reply) => {
    try {
      const linkFound = await linkService.getLink(request.params)

      return reply.code(301).redirect(linkFound.original_url)
    } catch (error) {
      if (error instanceof ZodError) {
        const [_error] = JSON.parse(error.message)

        return reply.code(400).send({ status_code: 400, code: _error.code, message: _error.message })
      }

      return reply.code(500).send({ status_code: 500, message: 'Internal server errror' })
    }
  })

  app.get("/links", async (request, reply) => {

    const links = await linkService.getAllLinks()

    return reply.code(200).send(links)
  })
}