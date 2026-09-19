const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined in .env");
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Session expired");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data.token;
}

function getOrCreateRefreshPromise(): Promise<string> {
  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}



export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {

  const fullPath = `${API_URL}${path}`;
  const isFormData = options?.body instanceof FormData;


  async function makeRequest(token: string | null): Promise<Response> {
    return fetch(fullPath, {
      credentials: "include",
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
      ...options,
    });
  }


  const token = localStorage.getItem("token");
  let response = await makeRequest(token);

  
  if (response.status === 401 && path !== "/auth/refresh") {
    try {
      const newToken = await getOrCreateRefreshPromise();
      response = await makeRequest(newToken);
    } catch {
      localStorage.removeItem("token");
      window.location.href = "/signin";
      throw new Error("Session expired");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
}
