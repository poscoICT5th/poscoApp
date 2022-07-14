import 'react-native-gesture-handler';
import React, { useState , useEffect, useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useRootData from './src/hooks/useRootData';
import MainNavigator from './src/screen/NavigationBar/MainNavigator'
import { NativeBaseProvider } from 'native-base';
import LoginNavigator from './src/screen/NavigationBar/LoginNavigator'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';

PushNotification.createChannel({
  channelId: "myChannel",
  channelName : "myChannel"
})

const App = () => {
  const [pushToken, setPushToken] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const foregroundListener = useCallback(() => {
    messaging().onMessage(async message => {
      console.log(message)
      PushNotification.localNotification({
        message: message.notification.body,
        title: message.notification.title,
        channelId: true,
      })
    })
  }, [])
      
  const handlePushToken = useCallback(async () => {
    const enabled = await messaging().hasPermission()
    if (enabled) {
      const fcmToken = await messaging().getToken()
      if (fcmToken) setPushToken(fcmToken)
    } else {
      const authorized = await messaging.requestPermission()
      if (authorized) setAuthorized(true)
    }
  }, [])

  const saveTokenToDatabase = useCallback(async (token) => {
    const { error } = await setFcmToken(token)
    if (error) throw Error(error)
  }, [])
  
  const saveDeviceToken = useCallback(async () => {
    if (isAuthorized) {
      const currentFcmToken = await firebase.messaging().getToken()
      if (currentFcmToken !== pushToken) {
        return saveTokenToDatabase(currentFcmToken)
      }

      return messaging().onTokenRefresh((token) => saveTokenToDatabase(token))
    }
  }, [pushToken, isAuthorized])

  useEffect(() => {
    foregroundListener()  
    handlePushToken()
    saveDeviceToken()
  }, [])

  const { token, setToken } = useRootData(
    ({ screenModeStore }) => ({
      token: screenModeStore.token.get(),
      setToken: screenModeStore.setToken,
    }),
  );
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {token ? <MainNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App