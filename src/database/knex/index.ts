import { knex } from 'knex'
import { development } from "./Environment"

export const Knex = knex(development)