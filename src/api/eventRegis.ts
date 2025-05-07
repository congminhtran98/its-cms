const API_URL = "/api";

export const createEventRegistration = async (values: {
  eventId: string;
  status: string;
}) => {
  const res = await fetch(`${API_URL}/event-registrations/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
    },
    body: JSON.stringify(values),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Create event registration failed");
  }

  return json.data;
};


export const updateStatusEventRegistration = async (values: {
  id: string;
  status: string;
}) => {
  const res = await fetch(`${API_URL}/event-registrations/${values.id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
    },
    body: JSON.stringify({ status: values.status }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Update event registration failed");
  }

  return json.data;
}