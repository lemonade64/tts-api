export default function manifest() {
  return {
    name: "Amplify",
    short_name: "Amplify",
    description:
      "API for converting text to speech (TTS) using speech synthesiser.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
