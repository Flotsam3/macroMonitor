import { Options } from "../context/OptionContext";

const URL: string = import.meta.env.VITE_API_URL || "/api";

/**
 * Check if user is authenticated (doesn't redirect on failure)
 */
export const checkAuth = async () => {
  try {
    const response = await fetch(URL + "/profile", {
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Auth check error:", error);
    return null;
  }
};

/**
 * Handle fetch with error handling
 */
const apiFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {...options, credentials: "include"});

    // Handle 401 - token expired/invalid
    if (response.status === 401) {
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
  return apiFetch(URL + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
};

export const login = async (email: string, password: string) => {
  return apiFetch(URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async () => {
  await apiFetch(URL + "/logout", {
    method: "POST",
  });
  window.location.href = "/";
};

export const getProfile = async () => {
  return apiFetch(URL + "/profile");
};

// ============================================
// OPTIONS
// ============================================

export const createOptions = async (payload: object) => {
  return apiFetch(URL + "/options", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const updateOptions = async (payload: object) => {
  return apiFetch(URL + "/options", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const getAllOptions = async () => {
  return apiFetch(URL + "/options", {
    headers: { "Content-Type": "application/json" },
  });
};

// ============================================
// FOOD
// ============================================

export const createFood = async (payload: object) => {
  return apiFetch(URL + "/food", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const getAllFood = async () => {
  return apiFetch(URL + "/food", {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteFoodItem = async (payload: object) => {
  return apiFetch(URL + "/food", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ previousImage: image, image: base64Image }),
  });
};

// ============================================
// CONSUMPTION
// ============================================

export const saveConsumption = async (payload: Options[]) => {
  return apiFetch(URL + "/consumption", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const getConsumption = async () => {
  return apiFetch(URL + "/consumption", {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteConsumptionItem = async (id: string): Promise<void> => {
  return apiFetch(URL + `/consumption/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteConsumption = async (): Promise<void> => {
  return apiFetch(URL + "/consumption", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

// ============================================
// ARCHIVE
// ============================================

export const createArchiveItem = async (payload: object) => {
  return apiFetch(URL + "/archive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const getArchive = async () => {
  return apiFetch(URL + "/archive", {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteArchiveItem = async (id: string): Promise<void> => {
  return apiFetch(URL + `/archive/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteArchive = async (): Promise<void> => {
  return apiFetch(URL + "/archive", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};