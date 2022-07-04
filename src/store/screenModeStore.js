import {observable, runInAction} from 'mobx';
import {Alert} from 'react-native';

export const login = async (userInfo) => {
  console.log('userinfo', userInfo);
  let result = await axios
    .post('http://18.177.162.121:8080/user/login/', userInfo)
    .then(response => {
			console.log(response.data.token);
      return response.data;
    })
    .catch(() => {
      return null;
    })
  return result;
}

const createStore = () => {
  const screenModeStore = {	
    token: observable.box(null),
    setToken: data => runInAction(() => screenModeStore.token.set(data)),
    loginApi: async (id, pw) => {
      let token = await login({
        email: id,
        password: pw,
      });
      if (token == null) {
        Alert.alert('오류', '로그인 실패', [{text: 'OK', style: 'ok'}]);
      }
      runInAction(() => {
        screenModeStore.setToken(token);
      });
    },
  };
  return screenModeStore;
};

const store = createStore();
export default store;