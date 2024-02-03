const apiUrl = "/api/customers"

export const getCustomers = () => {
  return fetch(apiUrl).then((r) => r.json());
};

// export const getCustomerById = (id) => {
//   return fetch(`${apiUrl}/${id}`)
//   .then((r) => r.json())
// };

export const getCustomerById = (id) => new Promise((resolve, reject) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
