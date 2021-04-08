import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addOne = (newPhone) => {
  const request = axios.post(baseUrl, newPhone);
  return request.then((response) => response.data);
};

const deleteOne = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateOne = (id, newPhone) => {
  const request = axios.put(`${baseUrl}/${id}`, newPhone);
  return request.then((response) => response.data);
};

const phones = { getAll, addOne, deleteOne, updateOne };

export default phones;
