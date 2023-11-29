import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default async function Changelog() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Changelog</PageHeaderHeading>
        <PageHeaderDescription>
          Here are all the changes we have made to Link.
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2" />

      <div className="font-bold text-2xl">V0.1.1</div>
      <div>- Added the ability to remove a link.</div>
      <div>- Fixed a bug where duplicated aliases can be created.</div>
      <div>- Added visit count.</div>
      <div>- Added this changelog page.</div>
      <div>- Switched the create feedback message display to toast.</div>

      <div className="py-2" />

      <div className="font-bold text-2xl">V0.1.0</div>
      <div>- Introducing Link.</div>
    </div>
  );
}
