import { DataProvider } from "@refinedev/core";

export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("auth-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createDataProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,

  getList: async ({ resource, pagination }) => {
    const current = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 10;
    const start = (current - 1) * pageSize;
    const end = current * pageSize;

    const res = await fetch(`${apiUrl}/${resource}`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      // Cho Refine biết lỗi để gọi authProvider.onError
      throw {
        status: res.status,
        message: json.message || "Get list request failed",
      };
    }
    return {
      data: json.data ?? [],
      total: json.data?.length ?? 0,
    };
  },

  getOne: async ({ resource, id }) => {
    const res = await fetch(`${apiUrl}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      // Cho Refine biết lỗi để gọi authProvider.onError
      throw {
        status: res.status,
        message: json.message || "Get one request failed",
      };
    }
    return {
      data: json.data,
    };
  },

  create: async ({ resource, variables }) => {
    const res = await fetch(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      // Cho Refine biết lỗi để gọi authProvider.onError
      throw {
        status: res.status,
        message: json.message || "Create request failed",
      };
    }
    return {
      data: json.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const res = await fetch(`${apiUrl}/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      // Cho Refine biết lỗi để gọi authProvider.onError
      throw {
        status: res.status,
        message: json.message || "Update request failed",
      };
    }
    return {
      data: json.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const res = await fetch(`${apiUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      // Cho Refine biết lỗi để gọi authProvider.onError
      throw {
        status: res.status,
        message: json.message || "Delete request failed",
      };
    }
    return {
      data: json.data,
    };
  },
  custom: async ({ url, method, filters, payload, sorters, query, headers: customHeaders }) => {
    const res = await fetch(`${apiUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
        ...customHeaders,
      },
      body: method !== "get" ? JSON.stringify(payload) : undefined,
    });
  
    const json = await res.json();
  
    if (!res.ok) {
      throw {
        status: res.status,
        message: json.message || "Custom request failed",
      };
    }
  
    return {
      data: json.data ?? json, // fallback nếu không bọc trong `data`
    };
  }
  
});
