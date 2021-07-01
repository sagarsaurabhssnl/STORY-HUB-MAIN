import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import write from './screens/write';
import read from './screens/read';
import github from './screens/github';
import Search from './screens/search';
import Login from './screens/login'

function main() {
  const main = createMaterialBottomTabNavigator();
  return (
    <main.Navigator
      shifting={true}
      barStyle={{ backgroundColor: "#444" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ }) => {
          if (route.name === 'Read') {
            return <Image source={require('./assets/read.png')} style={{ height: 30, width: 30 }} />;
          } else if (route.name === 'Write') {
            return <Image source={require('./assets/write.png')} style={{ height: 30, width: 30 }} />
          } else if (route.name === 'Source') {
            return <Image source={require('./assets/github.png')} style={{ height: 30, width: 30 }} />
          } else if (route.name === 'Search') {
            return <Image source={require('./assets/search.png')} style={{ height: 30, width: 30 }} />
          }
        },
      })}
    >
      <main.Screen name={"Write"} component={write} options={option.write} />
      <main.Screen name={"Read"} component={read} options={option.read} />
      <main.Screen name={"Search"} component={Search} options={option.search} />
      <main.Screen name={"Source"} component={github} options={option.git} />
    </main.Navigator>
  )
}

function login() {
  const log = createStackNavigator();
  return (
    <log.Navigator headerMode="none">
      <log.Screen name={"Login"} component={Login} />
    </log.Navigator>
  );
}

export default function App() {
  const app = createStackNavigator();
  return (
    <NavigationContainer>
      <app.Navigator headerMode="none">
        <app.Screen name={"AUTHENTICATION"} component={login} />
        <app.Screen name={"HOME"} component={main} />
      </app.Navigator>
    </NavigationContainer>
  );
}

var option = {
  write: {
    tabBarColor: "#17917a"
  },
  read: {
    tabBarColor: "#b94025"
  },
  git: {
    tabBarColor: "#000"
  },
  search: {
    tabBarColor: "#047"
  }
};
