import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changelog } from "@/config/site";
import { Dot } from "lucide-react";

export default async function Changelog() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Changelog</PageHeaderHeading>
        <PageHeaderDescription>
          Here are all the changes I have made to Link.
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2" />

      {changelog.map((release) => (
        <Card key={release.version} className="my-4">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">
              V{release.version}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {release.items.map((log, idx) => (
              <div className="flex" key={idx}>
                <Dot className="flex-shrink-0" /> <div>{log}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
