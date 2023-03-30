import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import QuestionnairePage from './screens/QuestionnairePage';
import SelectDoctor1 from './screens/SelectDoctor1';
import SelectDoctor2 from './screens/SelectDoctor2';
import DoctorPage from './screens/DoctorPage';
import TaskPage from './screens/TaskPage';
import NavBar from './screens/navbarex';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigator" component={NavBar} />
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="QuestionnairePage" component={QuestionnairePage} />
        <Stack.Screen name="SelectDoctor1" component={SelectDoctor1} />
        <Stack.Screen name="SelectDoctor2" component={SelectDoctor2} />
        <Stack.Screen name="DoctorPage" component={DoctorPage} />
        <Stack.Screen name="TaskPage" component={TaskPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
