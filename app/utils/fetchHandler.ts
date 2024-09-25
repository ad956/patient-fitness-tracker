import getBaseUrl from "@utils/getBaseUrl";

type ApiRequestOptions = Omit<RequestInit, "cache"> & {
  cache?: RequestCache;
  revalidate?: number | false;
};

type FetchResult<T> = {
  data?: T;
  error?: {
    title: string;
    message: string;
    stackTrace: string | null;
  };
};

export default async function fetchHandler<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
  session?: string
): Promise<FetchResult<T>> {
  const serverUrl = getBaseUrl();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (session) headers.set("Authorization", `Bearer ${session}`);

  try {
    const { cache, revalidate, ...restOptions } = options;

    let cacheOption: RequestCache | undefined;
    if (cache) {
      cacheOption = cache;
    } else if (revalidate === false) {
      cacheOption = "no-store";
    } else if (typeof revalidate === "number") {
      cacheOption = "force-cache";
    }

    const fetchOptions: RequestInit = {
      ...restOptions,
      headers,
    };

    if (cacheOption) {
      fetchOptions.cache = cacheOption;
    }

    if (typeof revalidate === "number") {
      fetchOptions.next = { revalidate };
    }

    const response = await fetch(`${serverUrl}${endpoint}`, fetchOptions);

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          title: result.title || "Error",
          message: result.message || "An error occurred",
          stackTrace: result.stackTrace || null,
        },
      };
    }

    return { data: result };
  } catch (error: any) {
    console.error("Error in fetchHandler:", error);
    throw error;
  }
}
