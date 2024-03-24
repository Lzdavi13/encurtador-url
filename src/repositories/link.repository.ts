import type { Knex } from "knex";
import { Link } from "../interfaces/ILink";
import { ILinkRepository } from "../interfaces/ILinkRepository";

export class LinkRepository implements ILinkRepository {
  constructor(private knex: Knex) {
  }

  async create(code: string, url: string): Promise<Link> {
    const [result] = await this.knex<Link>("short_links").insert({ code, original_url: url }).returning("*")

    return result
  }

  async findByCode(code: string): Promise<Link> {
    const [result] = await this.knex.select("*").from<Link>("short_links").where({ code })

    return result
  }
  async getAll(): Promise<Link[]> {
    const result = await this.knex.select("*").from<Link>("short_links").orderBy('created_at', 'desc')

    return result
  }
}