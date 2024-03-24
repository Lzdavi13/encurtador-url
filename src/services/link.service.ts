import { HttpException } from "../helpers/HttpExceptions";
import { CreateLinkDto } from "../interfaces/CreateLink.dto";
import { Link } from "../interfaces/ILink";
import { ILinkRepository } from "../interfaces/ILinkRepository";
import { schemaCreateLink } from "../schemas/createLink";


export class LinkService {
  constructor(private repository: ILinkRepository) { }

  async create(createLink: CreateLinkDto): Promise<Link> {
    const { code, url } = schemaCreateLink.parse({ ...createLink })

    const result = await this.repository.findByCode(code)

    if (result) {
      throw new HttpException("Duplicated code", 400)
    }

    const link = await this.repository.create(code, url)

    return link
  }
}