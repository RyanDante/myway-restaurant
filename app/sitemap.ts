import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://myway-restaurant.vercel.app";

  const routes = [
    "",
    "/menu",
    "/reservations",
    "/about",
    "/gallery",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/menu" || route === "/reservations" ? 0.9 : 0.7,
  }));

  return routes;
}
