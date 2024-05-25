import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChineseSearchContainer from '../components/ChineseSearch/ChineseSearchContainer';
import IndexContainer from '../components/Index/IndexContainer';
import LoginContainer from '../components/Login/LoginContainer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Index" component={IndexContainer} />
        <Stack.Screen name="Login" component={LoginContainer} />
        <Stack.Screen name="ChineseSearch" component={ChineseSearchContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
