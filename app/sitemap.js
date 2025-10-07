import clientPromise from "@/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://aeloria.com";

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic dress pages
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");
    const dresses = await db.collection("clothes").find({}).toArray();

    const dressRoutes = dresses.map((dress) => ({
      url: `${baseUrl}/dress/${dress._id.toString()}`,
      lastModified: dress.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...routes, ...dressRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
