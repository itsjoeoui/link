import { db } from "@/lib/kysely";
import { initPostgres } from "@/utils/postgres/migration";
import LinkButton from "./link-button";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export async function LinkTable() {
  let links;
  try {
    links = await db.selectFrom("link").selectAll().execute();
    console.log(links);
  } catch (e: any) {
    if (e.message === 'relation "link" does not exist') {
      await initPostgres();
      links = await db.selectFrom("link").selectAll().execute();
    } else {
      throw e;
    }
  }

  return (
    <Table>
      <TableCaption>A list of your links.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.alias}>
            <TableCell className="font-medium">{link.name}</TableCell>
            <TableCell>{link.destination}</TableCell>
            <TableCell className="text-right">
              <LinkButton link={link.alias} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LinkTable;
