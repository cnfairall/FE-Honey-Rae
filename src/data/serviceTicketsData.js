const _apiUrl = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getTicketById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((r) => r.json());
};

export const createTicket = (payload) => new Promise((resolve, reject) => {
  fetch(_apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export const deleteTicket = async (id) => {
  const response = await fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to Delete");
  }
};
