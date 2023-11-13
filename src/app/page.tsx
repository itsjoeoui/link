import { Icons } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/style";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import packageJson from "../../package.json";
import Image from "next/image";
import dashboardPic from "../../assets/home.png";

export default async function Home() {
  return (
    <div className="container">
      <PageHeader className="">
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          💫 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
          <span className="sm:hidden">
            V{packageJson.version}: Introducing Link
          </span>
          <span className="hidden sm:inline">
            V{packageJson.version}: Introducing Link
          </span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
        <PageHeaderHeading>
          Link{" "}
          <span className="font-normal text-xl tracking-normal leading-normal">
            from <Link href="https://jyu.dev">jyu.dev</Link>
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          An open source link shortener (may be longer) service.
        </PageHeaderDescription>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Link href="/dashboard" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </div>
      </PageHeader>
      <div>
        <Image src={dashboardPic} alt="Dashboard" width={960} />
      </div>
    </div>
  );
}
