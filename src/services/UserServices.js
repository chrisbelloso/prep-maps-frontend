import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getUsersFromApi = async () => {
  const response = await axios.get(`${apiUrl}/auth`);
  return response;
};

export const getSingleUserFromApi = async (id) => {
  const response = await axios.get(`${apiUrl}/auth/user/${id}`);
  return response;
}

export const signupUser = async (user) => {
  const response = await axios.post(`${apiUrl}/auth/signup/`, user);
  return response;
};

export const loginUserToApi = async (user) => {
  const response = await axios.post(`${apiUrl}/auth/login`, user);
  try {
    console.log(response.data);
    if (response.data.user) {
      localStorage.setItem("jwtprepmap", JSON.stringify(response.data));
    }
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const updateUserToApi = async (id, user) => {
  const response = await axios.put(`${apiUrl}/auth/user/${id}`, user);
  return response;
};

export const deleteUserFromApi = async (id) => {
  const response = await axios.delete(`${apiUrl}/auth/user/${id}`);
  return response;
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwtprepmap")) {
    return JSON.parse(localStorage.getItem("jwtprepmap"));
  }
  return false;
};

export const logOut = async () => {
  await localStorage.removeItem("jwtprepmap");
};
