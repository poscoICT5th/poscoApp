import {observable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import { login } from '../axios';

const createStore = () => {
  const screenModeStore = {
    token: observable.box(null),
    // token: login.data.token,
    setToken: data => runInAction(() => screenModeStore.token.set(data)),
    loginApi: async (userInfo) => {
			// console.log('userInfo', userInfo);
			
      let token = await login(userInfo);
			// console.log("Token", token);
      if (token == null) {
        Alert.alert('로그인 실패', '아이디, 비밀번호를 다시 확인해 주세요.', [{text: 'OK', style: 'ok'}]);
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