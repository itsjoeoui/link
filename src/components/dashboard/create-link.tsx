"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLink } from "@/utils/postgres/actions";
import { createLinkSchema } from "@/types/link";
import { useEffect, useState } from "react";
import { generateRandomAlias } from "@/utils/generate";

export function CreateLink() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    form.setValue("alias", generateRandomAlias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      name: "",
      destination: "",
      alias: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createLinkSchema>) {
    const result = await createLink(values);
    setMsg(result.message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormDescription>
                Give it a name so you can remember what it is.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="www.google.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the link that will be shortened.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input placeholder="google" {...field} />
              </FormControl>
              <FormDescription>
                Set a custom alias for this link. The URL will become
                link.jyu.dev/l/{field.value}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
        <div>{msg}</div>
      </form>
    </Form>
  );
}
