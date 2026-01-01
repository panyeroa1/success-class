import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Success Invest",
  description: "Success Invest: Real Estate Investment Mentorship & Hands-on Training",
  keywords: [
    "real estate",
    "investment",
    "mentorship",
    "denver",
    "hands-on training",
    "success invest",
// ... other keywords
  ] as Array<string>,
  authors: {
    name: "Success Invest",
    url: "https://invest-success.com",
  },
} as const;

export const links = {
  sourceCode: "https://invest-success.com",
} as const;
