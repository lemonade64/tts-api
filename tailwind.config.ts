import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "../components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "@/src/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
