"use server";

import { getSessionToken } from "@lib/sessions/sessionUtils";
import getBaseUrl from "@utils/getBaseUrl";

type ApiRequestOptions = Omit<RequestInit, "cache"> & {
  cache?: RequestCache;
  revalidate?: number | false;
};

async function fetchHandler(endpoint: string, options: ApiRequestOptions = {}) {
  const session = getSessionToken();
  const serverUrl = getBaseUrl();

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${session}`);
  headers.set("Content-Type", "application/json");

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
    throw new Error(result.error || "An error occurred");
  }

  return result;
}

export default fetchHandler;
