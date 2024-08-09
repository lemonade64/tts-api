export default function sitemap() {
  return [
    {
      url: "https://amplify-tts.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://amplify-tts.vercel.app/usage",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://amplify-tts.vercel.app/resources/uint8array",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://amplify-tts.vercel.app/resources/base64",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
