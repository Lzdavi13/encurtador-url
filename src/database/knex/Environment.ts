import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
  client: 'pg',
  connection: {
    host: "localhost",
    port: 5435,
    user: "pguser",
    password: "pgpassword",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "..", "migrations"),
  },
};

export const test: Knex.Config = {
  ...development,
  connection: ":memory:"
}


