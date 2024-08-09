import { useRouter } from "next/navigation";

const config = {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Amplify",
      };
    }
  },
  logo: <></>,
  project: {
    link: "https://github.com/lemonade64/tts-api",
  },
  docsRepositoryBase: "https://github.com/lemonade64/tts-api",
  navigation: {
    prev: true,
    next: true,
  },
  sidebar: {
    toggleButton: true,
  },
  darkMode: true,
  themeSwitch: {
    useOptions() {
      return {
        dark: "Dark",
      };
    },
  },
};

export default config;
