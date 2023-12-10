import axios from "axios";

// const API_URL = "http://localhost:4000/api/user/";

const API_URL = "https://frontend-developer-task-server.onrender.com/api/user/";

const addUserData = async (user) => {
  const response = await axios.post(API_URL, user);

  if (response.data) {
    localStorage.setItem("taskUser", JSON.stringify(response.data));
  }

  return response.data;
};

const getUserData = async (id) => {
  const response = await axios.get(API_URL, { id });
  return response.data;
};

const updateUserData = async (userData) => {
  const response = await axios.put(API_URL, userData);

  if (response.data) {
    localStorage.setItem("taskUser", JSON.stringify(response.data));
  }

  return response.data;
};

const deleteUserData = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  if (response.data) {
    localStorage.removeItem("taskUser");
  }

  return response.data;
};

const getSectorData = async () => {
  const response = await axios.get(`${API_URL}/sector`);
  return response.data;
};

const userDataService = {
  addUserData,
  getUserData,
  updateUserData,
  deleteUserData,
  getSectorData,
};

export default userDataService;
