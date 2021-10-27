import axios from "axios";

const API_URL = "http://localhost:9000/api";

const register = async (first_name, last_name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    first_name,
    last_name,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
