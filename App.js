import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import ListScreen from './Screens/ListScreen';
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {

  React.useEffect(()=>{
    if(Platform.OS==='android')SplashScreen.hide();
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name=" " component={ListScreen} 
        options={{ headerShown: false }}
       />
      </Stack.Navigator>
    </NavigationContainer>
  );
}