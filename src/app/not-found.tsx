import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Error() {
  return (
    <div className="container">
      <div className="py-6"></div>
      <div className="text-3xl font-bold">Error</div>
      <div className="py-2"></div>
      <div>
        Something went wrong, either the link is invalid, or it has been
        deleted!
      </div>

      <div className="py-2"></div>
      <Link href="/">
        <Button>Back</Button>
      </Link>
    </div>
  );
}
