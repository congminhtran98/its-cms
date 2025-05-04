import { getAuthHeader } from "./auth"; // hàm lấy token từ localStorage

export const getProfile = async () => {
  const res = await fetch("/api/users/get-me", {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  return json.data;
};
