import axios from "axios";

const API_URL = "http://localhost:9000/api";

const register = async (first_name, last_name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    first_name,
    last_name,
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  if (response) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
