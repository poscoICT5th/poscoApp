import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
const importURL = "http://35.77.20.236:8080/import"
const exportURL = "http://13.230.30.203:8080/export"
const moveURL = "http://35.77.44.58:8080/move"
const warehouseURL = "http://35.74.235.120:8080/warehouse"
const inventoryURL = "http://13.230.73.69:8080/inventory"
const userURL = "http://18.177.162.121:8080/user"

export const login = async (userInfo) => {
  console.log('userinfo', { params: userInfo });
  axios.defaults.baseURL = userURL
  let result = await axios
    .post('/login/', userInfo)
    .then(res => {
      console.log(res.data.sessionID)
      console.log(res.data.token);
      console.log(jwtDecode(res.data.token));
      return res.data;
    })
    .catch((err) => {
      console.log(err)
      return null;
    })
  return result;
}

export default axios;