let cachedBaseUrl: string;

export default function getBaseUrl() {
  if (cachedBaseUrl) {
    return cachedBaseUrl;
  }

  if (process.env.NODE_ENV === "production") {
    cachedBaseUrl = process.env.BASE_URL || "http://localhost:3000";
  } else {
    cachedBaseUrl = "http://localhost:3000";
  }

  return cachedBaseUrl;
}
