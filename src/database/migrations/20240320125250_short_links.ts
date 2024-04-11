import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("short_links", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary()
    table.string("code").unique()
    table.text("original_url")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("short_links")
}
