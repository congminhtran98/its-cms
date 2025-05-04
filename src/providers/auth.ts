type AuthTokenResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;}
};

type HttpError = {
  status: number;
  message: string;
};

export const createAuthProvider = (apiUrl: string) => ({
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = (await response.json()) as AuthTokenResponse;

      if (response.ok) {
        localStorage.setItem("auth-token", data.data.accessToken);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Invalid credentials",
          name: "Invalid credentials",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Error occurred during login",
          name: "Login Error",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("auth-token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },

  getPermissions: async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return null;
    return null;
  },

  verifyPassword: async (currentPassword: string) => {
    const token = localStorage.getItem("auth-token");
    if (!token) return false;

    try {
      const response = await fetch(`/api/auth/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword }),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },

  getIdentity: async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return null;

    console.log(token)

    try {
      const response = await fetch(`/api/users/get-me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        return user;
      }
    } catch (error) {
      return null;
    }

    return null;
  },

  onError: async (error: HttpError) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("auth-token");
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return {};
  },
});
