import { CreateLink } from "@/components/dashboard/create-link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/kysely";
import { initPostgres, nukePostgres } from "@/utils/postgres/migration";
import { currentUser } from "@clerk/nextjs";

export default async function Dashboard() {
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

  const user = await currentUser();

  return (
    <div className="container">
      <div className="py-6"></div>
      <div className="text-3xl font-bold">Create Link</div>
      <div className="py-2"></div>
      <CreateLink />
      <div className="py-2"></div>

      {user?.emailAddresses[0].emailAddress === "joey@jyu.dev" && (
        <form action={nukePostgres}>
          <Button type="submit">Nuke</Button>
        </form>
      )}

      {links.map((link) => (
        <div key={link.alias} className="flex gap-2">
          <div>{link.destination}</div>
          <div>{link.alias}</div>
        </div>
      ))}
    </div>
  );
}
