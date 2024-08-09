export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://amplify-tts.vercel.app/sitemap.xml",
  };
}
