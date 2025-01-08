let cachedBaseUrl: string;

export default function getBaseUrl() {
  if (cachedBaseUrl !== undefined) {
    return cachedBaseUrl;
  }

  if (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  ) {
    cachedBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  } else {
    cachedBaseUrl = "http://localhost:3000";
  }

  return cachedBaseUrl;
}
