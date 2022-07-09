import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const login = async (userInfo) => {
  console.log('userinfo', {params: userInfo});
	axios.defaults.baseURL = "http://18.177.162.121:8080/user"
  let result = await axios
    .post('/login/',userInfo)	
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
