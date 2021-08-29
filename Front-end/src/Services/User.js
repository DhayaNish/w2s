import http from "./index";


 const login = (data) => {
  console.log(data)
  return http.post("/api/login", data);
};

const register = (data) => {
  return http.post("/api/signup", data);
};

const getallusers = async () => {
  var token = await localStorage.getItem('token')
  console.log(token)
  return http.get("/api/get", { headers: { "token": `${token}` } });
};


const updateuser = async (id,data) => {
  var token = await localStorage.getItem('token')
  console.log(token)
  return http.put(`/api/update/${id}`, data, { headers: { "token": `${token}` } });
};

const deleteuser =async (id,data) => {
  var token = await localStorage.getItem('token')
  console.log(token)
  return http.delete(`/api/delete/${id}`, { headers: { "token": `${token}` } });
};

const getuser =async () => {
  var token = await localStorage.getItem('token')
  console.log(token)
  return http.get("/api/getuser", { headers: { "token": `${token}` } });
};


export default {
  login,
  register,
  getallusers,
  updateuser,
  deleteuser,
  getuser
};