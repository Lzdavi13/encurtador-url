import { Link } from "../../../entities/Link";

declare module 'knex/types/tables' {
  interface Tables {
    link: Link
  }
}