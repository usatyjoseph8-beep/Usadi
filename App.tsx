import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Linking from 'expo-linking';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import HistoryScreen from './screens/HistoryScreen';
import StrategiesScreen from './screens/StrategiesScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useAuthBootstrap } from './lib/auth';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsRoot(){
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="History" component={HistoryScreen} />
      <Tabs.Screen name="Strategies" component={StrategiesScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} />
    </Tabs.Navigator>
  );
}

export default function App(){
  const prefix = Linking.createURL('/');
  const linking = {
    prefixes: [prefix, 'usadi://'],
    config: { screens: { Login: 'login', Root: { screens: { Dashboard: 'dashboard' } } } }
  };

  const { ready, isAuthed } = useAuthBootstrap();

  if(!ready) return null;

  return (
    <NavigationContainer linking={linking} theme={DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        {!isAuthed ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Root" component={TabsRoot} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
