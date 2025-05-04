const API_URL = "/api";

export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
});

export const searchEvents = async (params: {
  name?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}) => {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${API_URL}/events/search?${query}`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};

export const getUpcomingEvents = async () => {
  const res = await fetch(`${API_URL}/events/upcoming`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};

export const getEventRegistrationCount = async (eventId: string) => {
  const res = await fetch(`${API_URL}/events/${eventId}/registration-count`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};

export const getEventAvailableSpace = async (eventId: string) => {
  const res = await fetch(`${API_URL}/events/${eventId}/has-available-space`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};
