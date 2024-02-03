const _apiUrl = "/api/employees";

export const getEmployees = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getEmployeeById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((r) => r.json());
};
