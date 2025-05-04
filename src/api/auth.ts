export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
});
