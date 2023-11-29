export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Link",
  description: "Joey's link sharing tool.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Changelog",
      href: "/changelog",
    },
  ],
  links: {
    github: "https://github.com/itsjoeoui/link",
  },
};

export const changelog = [
  {
    version: "0.1.1",
    items: [
      "Added the ability to remove a link.",
      "Fixed a bug where duplicated aliases can be created.",
      "Added visit count.",
      "Added this changelog page.",
      "Switched the create feedback message display to toast.",
    ],
  },
  {
    version: "0.1.0",
    items: ["Introduce Link!"],
  },
];
