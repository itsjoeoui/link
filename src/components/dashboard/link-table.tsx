import { db } from "@/lib/kysely";
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
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function LinkTable() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  let links;
  let startTime = Date.now();

  try {
    links = await db
      .selectFrom("link")
      .selectAll()
      .where("ownerId", "=", user.id)
      .execute();
  } catch (e: any) {
    if (e.message === 'relation "link" does not exist') {
      links = await db
        .selectFrom("link")
        .selectAll()
        .where("ownerId", "=", user.id)
        .execute();
    } else {
      throw e;
    }
  }

  const duration = Date.now() - startTime;

  return (
    <Table>
      <TableCaption>
        Loaded {links.length} link(s) in {duration}ms
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead className="whitespace-nowrap">Visit Count</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.alias}>
            <TableCell className="font-medium">{link.name}</TableCell>
            <TableCell>{link.destination}</TableCell>
            <TableCell>{link.visitCount}</TableCell>
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
