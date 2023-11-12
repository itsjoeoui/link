import { Generated } from "kysely";

export interface Database {
  link: LinkTable;
}

export interface LinkTable {
  id: Generated<number>;
  destination: string;
  alias: string;
  ownerId: string;
  name: string;
}
