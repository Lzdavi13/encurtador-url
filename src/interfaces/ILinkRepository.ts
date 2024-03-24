import { Link } from "./ILink";

export interface ILinkRepository {
  create(code: string, url: string): Promise<Link>
  findByCode(code: string): Promise<Link>
  getAll(): Promise<Link[]>
}