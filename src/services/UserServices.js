import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getUsersFromApi = async () => {
  const response = await axios.get(`${apiUrl}/auth`);
  return response;
};

export const signupUser = async (user) => {
  const response = await axios.post(`${apiUrl}/auth/signup/`, user);
  return response;
};

export const loginUser = async (user) => {
  const response = await axios.post(`${apiUrl}/auth/login/`, user);
  return response;
};

export const updateUserToApi = async (user) => {
  const response = await axios.put(`${apiUrl}/auth/user/${user._id}`, user);
  return response;
};

export const deleteUserFromApi = async (id) => {
  const response = await axios.delete(`${apiUrl}/auth/user/${id}`);
  return response;
};
