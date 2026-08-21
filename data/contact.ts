export const contact = {
  email: "tienhung.nnth@gmail.com",
  links: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/hungngonguyentien",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nguyen-tien-hung-ngo-021306373",
    },
  ],
} as const;

export type SocialLinkId = (typeof contact.links)[number]["id"];
