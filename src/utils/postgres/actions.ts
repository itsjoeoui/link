"use server";

import z from "zod";
import { createLinkSchema } from "@/types/link";
import { db } from "@/lib/kysely";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function createLink(formData: z.infer<typeof createLinkSchema>) {
  const user = await currentUser();

  if (!user) {
    return { ok: false, message: "Unauthorized" };
  }

  if (user.emailAddresses[0].emailAddress !== "joey@jyu.dev") {
    return { ok: false, message: "Only Joey is allowed for now xD" };
  }

  try {
    await db
      .insertInto("link")
      .values({
        name: formData.name || "",
        destination: formData.destination,
        alias: formData.alias || "",
        ownerId: user.id,
      })
      .executeTakeFirst();

    revalidatePath("/dashboard");

    return { ok: true, message: "Success!" };
  } catch (e: any) {
    return { ok: false, message: e.message };
  }
}

export async function getLink(alias: string) {
  const destination = await db
    .selectFrom("link")
    .select("destination")
    .distinct()
    .where("alias", "=", alias)
    .execute();

  return destination[0].destination;
}
