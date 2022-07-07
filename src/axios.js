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

export function importToday() {
  axios.defaults.baseURL = importURL
  axios.get('/search', {
    params: {
      instruction_no: "전체보기",
      status: "전체보기",
      lot_no: "전체보기",
      item_code: "전체보기",
      item_name: "전체보기",
      min_order_amount: -1,
      max_order_amount: 10000000,
      min_im_amount: -1,
      max_im_amount: 10000000,
      unit: "전체보기",
      min_weight: -1,
      max_weight: 10000000,
      min_thickness: -1,
      max_thickness: 10000000,
      min_height: -1,
      max_height: 10000000,
      min_width: -1,
      max_width: 10000000,
      industry_family: "전체보기",
      product_family: "전체보기",
      location: "전체보기",
      to_warehouse: "전체보기",
      customer: "전체보기",
      order_date: "전체보기",
      inst_reg_date: "전체보기",
      inst_deadline: '2022-12-31',
      done_date: "전체보기",
    }
  })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => { console.log(err) })
}
export default axios;