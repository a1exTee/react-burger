export const apiUrl = `https://norma.nomoreparties.space/api/`;

const response = (res) => {
   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
 
export const requestIngredients = async () => {
  const res = await fetch(`${apiUrl}ingredients`);
  return response(res);
}