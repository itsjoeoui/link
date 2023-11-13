"use client";

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
      }}
    >
      Copy
    </Button>
  );
};

export default LinkButton;
