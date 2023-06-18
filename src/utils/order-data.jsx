import { apiUrl } from "./data";

const response = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res} ${res.status} ${res.statusText}`);
};

export const orderData = (idArray) => {
  return fetch(`${apiUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': idArray
    })
  })
  .then((res) => response(res))
}