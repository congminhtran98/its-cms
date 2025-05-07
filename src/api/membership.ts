const API_URL = "/api";

export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
});

// GET: Lấy danh sách tất cả thành viên
export const getAllMemberships = async () => {
  const res = await fetch(`${API_URL}/memberships`, {
    headers: getAuthHeader(),
  });
  return res.json();
};

// POST: Tạo thành viên mới
export const createMembership = async (data: {
  userId: number;
  company: string;
  position: string;
  membershipType: string;
  startDate: string;
  endDate: string;
}) => {
  const res = await fetch(`${API_URL}/memberships`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// GET: Lấy thông tin thành viên theo ID
export const getMembershipById = async (id: string) => {
  const res = await fetch(`${API_URL}/memberships/${id}`, {
    headers: getAuthHeader(),
  });
  return res.json();
};

// PUT: Cập nhật thông tin thành viên
export const updateMembership = async (
  id: string,
  data: {
    company: string;
    position: string;
    membershipType: string;
    startDate: string;
    endDate: string;
  }
) => {
  const res = await fetch(`${API_URL}/memberships/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE: Xoá thành viên
export const deleteMembership = async (id: string) => {
  const res = await fetch(`${API_URL}/memberships/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  return res.json();
};

// GET: Lấy thông tin thành viên theo ID người dùng
export const getMembershipByUserId = async (userId: string) => {
  const res = await fetch(`${API_URL}/memberships/user/${userId}`, {
    headers: getAuthHeader(),
  });
  return res.json();
};

// GET: Lấy thông tin thành viên của người dùng hiện tại
export const getMyMembership = async () => {
  const res = await fetch(`${API_URL}/memberships/my-membership`, {
    headers: getAuthHeader(),
  });
  return res.json();
};
