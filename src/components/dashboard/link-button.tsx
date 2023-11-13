"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  link: string;
};

const LinkButton = ({ link }: Props) => {
  return (
    <Button
      onClick={() => {
        window.navigator.clipboard.writeText(
          window.location.origin + "/l/" + link,
        );
        toast("Link copied to clipboard!");
      }}
    >
      Copy
    </Button>
  );
};

export default LinkButton;
