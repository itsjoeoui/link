import { z } from "zod";

export const createLinkSchema = z.object({
  destination: z.string().url(),
  name: z.string().min(2).max(50).optional(),
  alias: z.string().min(2).max(50).optional(),
});
