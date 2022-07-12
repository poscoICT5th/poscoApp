function LoginNavigator(){
    const navOptionHandler = () => ({
      headerShown: false,
    });
    return(
      <StackApp.Navigator initialRouteName="LoginScreen">
        <StackApp.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={navOptionHandler}
        />
      </StackApp.Navigator>
    )
  }
  