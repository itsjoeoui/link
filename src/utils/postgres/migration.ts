"use server";
import { db } from "@/lib/kysely";
import { revalidatePath } from "next/cache";

export async function initPostgres() {
  await db.schema
    .createTable("link")
    .ifNotExists()
    .addColumn("id", "serial", (cb) => cb.primaryKey())
    .addColumn("destination", "varchar", (cb) => cb.notNull())
    .addColumn("alias", "varchar", (cb) => cb.notNull().unique())
    .addColumn("ownerId", "varchar", (cb) => cb.notNull())
    .addColumn("name", "varchar", (cb) => cb.notNull())
    .execute();

  revalidatePath("/dashboard");
}

export async function nukePostgres() {
  await db.schema.dropTable("link").execute();

  revalidatePath("/dashboard");
}
