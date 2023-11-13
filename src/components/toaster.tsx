"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export const Toaster = () => {
  const { resolvedTheme } = useTheme();
  return <SonnerToaster theme={resolvedTheme === "dark" ? "dark" : "light"} />;
};
