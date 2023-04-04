import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';  

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import QuestionnairePage from './screens/QuestionnairePage';
import SelectDoctor1 from './screens/SelectDoctor1';
import SelectDoctor2 from './screens/SelectDoctor2';
import DoctorPage from './screens/DoctorPage';
import TaskPage from './screens/TaskPage';

import HomeScreen from './screens/HomePage';
import NotificationsScreen from './screens/NotificationPage';
import ProfileScreen from './screens/ProfilePage';


const HomeStack = createStackNavigator();



const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#2F4052',borderTopWidth: 0},
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#2EEE9D',
      }}>

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
                <Icon style={[{color: color}]} size={30} name={'home'}/>  
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
                <Icon style={[{color: color}]} size={30} name={'notifications'}/>  
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
                <Icon style={[{color: color}]} size={30} name={'person'}/>  
          ),
        }}
      />
    </Tab.Navigator>
      );
};

const screenStack = () => {
  return(
    <NavigationContainer>
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="LoginPage" component={LoginPage}/>
      <HomeStack.Screen name="RegisterPage" component={RegisterPage} />
      <HomeStack.Screen name="QuestionnairePage" component={QuestionnairePage} />
      <HomeStack.Screen name="SelectDoctor1" component={SelectDoctor1} />
      <HomeStack.Screen name="SelectDoctor2" component={SelectDoctor2} />
      <HomeStack.Screen name="DoctorPage" component={DoctorPage} />
      <HomeStack.Screen name="TaskPage" component={TaskPage} />
      <HomeStack.Screen name="App" component={App}/>
    </HomeStack.Navigator>
    </NavigationContainer>
  )
};


  
export default screenStack;