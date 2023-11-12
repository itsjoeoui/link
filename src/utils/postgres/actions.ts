"use server";

import z from "zod";
import { createLinkSchema } from "@/types/link";
import { db } from "@/lib/kysely";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createLink(formData: z.infer<typeof createLinkSchema>) {
  console.log(formData);

  const { userId } = auth();

  if (!userId) {
    return { ok: false, message: "Unauthorized" };
  }

  try {
    await db
      .insertInto("link")
      .values({
        name: formData.name || "",
        destination: formData.destination,
        alias: formData.alias || "",
        ownerId: userId,
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
