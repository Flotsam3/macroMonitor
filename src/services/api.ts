import { Options } from "../context/OptionContext";

const URL: string = import.meta.env.VITE_API_URL || "/api";

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get token from localStorage
 */
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Get auth headers with token
 */
const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Handle fetch with error handling
 */
const apiFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    // Handle 401 - token expired/invalid
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return null;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return true;
    }

    return await response.json();
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
};

// ============================================
// AUTH FUNCTIONS
// ============================================

export const register = async (email: string, password: string, name?: string) => {
  const data = await apiFetch(URL + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const login = async (email: string, password: string) => {
  const data = await apiFetch(URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getProfile = async () => {
  return apiFetch(URL + "/profile", {
    headers: getAuthHeaders(),
  });
};

// ============================================
// OPTIONS
// ============================================

export const createOptions = async (payload: object) => {
  return apiFetch(URL + "/options", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
};

export const updateOptions = async (payload: object) => {
  return apiFetch(URL + "/options", {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
};

export const getAllOptions = async () => {
  return apiFetch(URL + "/options", {
    headers: getAuthHeaders(),
  });
};

// ============================================
// FOOD
// ============================================

export const createFood = async (payload: object) => {
  return apiFetch(URL + "/food", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
};

export const getAllFood = async () => {
  return apiFetch(URL + "/food", {
    headers: getAuthHeaders(),
  });
};

export const deleteFoodItem = async (payload: object) => {
  return apiFetch(URL + "/food", {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
};

export const uploadImage = async (
  id: string,
  image: string,
  base64Image: string | ArrayBuffer
): Promise<void> => {
  return apiFetch(URL + "/food/images/" + id, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ previousImage: image, image: base64Image }),
  });
};

// ============================================
// CONSUMPTION
// ============================================

export const saveConsumption = async (payload: Options[]) => {
  return apiFetch(URL + "/consumption", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
};

export const getConsumption = async () => {
  return apiFetch(URL + "/consumption", {
    headers: getAuthHeaders(),
  });
};

export const deleteConsumptionItem = async (id: string): Promise<void> => {
  return apiFetch(URL + `/consumption/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};

export const deleteConsumption = async (): Promise<void> => {
  return apiFetch(URL + "/consumption", {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};

// ============================================
// ARCHIVE
// ============================================

export const createArchiveItem = async (payload: object) => {
  return apiFetch(URL + "/archive", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
};

export const getArchive = async () => {
  return apiFetch(URL + "/archive", {
    headers: getAuthHeaders(),
  });
};

export const deleteArchiveItem = async (id: string): Promise<void> => {
  return apiFetch(URL + `/archive/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};

export const deleteArchive = async (): Promise<void> => {
  return apiFetch(URL + "/archive", {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};