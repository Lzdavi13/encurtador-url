import { Knex } from "../database/knex/index"
import { LinkRepository } from "../repositories/link.repository"
import { LinkService } from "../services/link.service"

const repository = new LinkRepository(Knex)
export const linkService = new LinkService(repository)
