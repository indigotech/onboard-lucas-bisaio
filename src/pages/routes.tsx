import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import LoginPage from './loginPage';
import HomeScreen from './homeScreenPage';

export default function Route() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: 'orange'}}}>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
