import { getLink } from "@/utils/postgres/actions";
import { redirect } from "next/navigation";

export default async function L({ params }: { params: { alias: string } }) {
  try {
    const destination = await getLink(params.alias);
    console.log("LMAO", destination);
    redirect("/dashboard");
  } catch (e) {}
}
