"use server";

import z from "zod";
import { createLinkSchema } from "@/types/link";
import { db } from "@/lib/kysely";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { Result } from "@/types/result";

export async function createLink(
  formData: z.infer<typeof createLinkSchema>,
): Promise<Result<string, string>> {
  const user = await currentUser();

  if (!user) {
    return { ok: false, error: "Unauthorized" };
  }

  try {
    let startTime = Date.now();

    await db
      .insertInto("link")
      .values({
        name: formData.name || "",
        destination: formData.destination,
        alias: formData.alias || "",
        ownerId: user.id,
        visitCount: 0,
      })
      .executeTakeFirst();
    const duration = Date.now() - startTime;

    revalidatePath("/dashboard");

    return { ok: true, value: `Success! (${duration}ms)` };
  } catch (e: any) {
    return { ok: false, error: "This alias has already been taken :(" };
  }
}

export async function removeLink(
  alias: string,
): Promise<Result<string, string>> {
  const user = await currentUser();

  if (!user) {
    return { ok: false, error: "Unauthorized" };
  }

  try {
    await db.deleteFrom("link").where("alias", "=", alias).execute();

    revalidatePath("/dashboard");

    return { ok: true, value: "Success!" };
  } catch (e: any) {
    return { ok: false, error: e.message };
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

    // no need to await this because we don't care about the result
    db.updateTable("link")
      .set((db) => ({
        visitCount: db("visitCount", "+", 1),
      }))
      .where("alias", "=", alias)
      .executeTakeFirst();

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
