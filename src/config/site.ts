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
