"use server";

import z from "zod";
import { createLinkSchema } from "@/types/link";
import { db } from "@/lib/kysely";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { Result } from "@/types/result";

export async function createLink(formData: z.infer<typeof createLinkSchema>) {
  const user = await currentUser();

  if (!user) {
    return { ok: false, message: "Unauthorized" };
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

export async function getLink(alias: string): Promise<Result<string>> {
  try {
    const destination = await db
      .selectFrom("link")
      .select("destination")
      .distinct()
      .where("alias", "=", alias)
      .execute();

    return {
      ok: true,
      value: destination[0].destination,
    };
  } catch (e: any) {
    return {
      ok: false,
      error: e,
    };
  }
}
