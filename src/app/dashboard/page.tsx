import { CreateLink } from "@/components/dashboard/create-link";
import LinkTable from "@/components/dashboard/link-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/kysely";
import { nukePostgres } from "@/utils/postgres/migration";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  const count = await db
    .selectFrom("link")
    .where("ownerId", "=", user.id)
    .select((eb) => eb.fn.count("ownerId").as("total"))
    .execute();

  return (
    <div className="container">
      <div className="py-3"></div>
      <div className="text-3xl font-bold">Welcome! {user?.firstName}</div>
      <div className="">
        You currently have {count[0].total.toString()} active link(s).
      </div>
      <div className="py-3"></div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create Link</CardTitle>
              <CardDescription>Create your redirect link here.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateLink />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Links</CardTitle>
              <CardDescription>
                Here are all the links you have.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LinkTable />
            </CardContent>
          </Card>
        </div>
      </div>

      {user?.emailAddresses[0].emailAddress === "joey@jyu.dev" && (
        <form action={nukePostgres}>
          <Button type="submit">Nuke</Button>
        </form>
      )}
    </div>
  );
}
