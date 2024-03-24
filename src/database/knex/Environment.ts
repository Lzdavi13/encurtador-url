import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
  client: 'pg',
  connection: {
    host: "localhost",
    port: 5435,
    user: "pgdocker",
    password: "pgpassword",
    database: "shortlinks"
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "..", "migrations"),
  },
};

export const test: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: ':memory:',
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
}

export const production: Knex.Config = {
  ...development
}


