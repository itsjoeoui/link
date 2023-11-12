import { Database } from "@/types/db";
import { createKysely } from "@vercel/postgres-kysely";

export const db = createKysely<Database>();
export { sql } from "kysely";
