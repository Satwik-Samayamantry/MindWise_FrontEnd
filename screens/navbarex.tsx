import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

// Screens
import HomeScreen from './HomePage';
import NotificationsScreen from './NotificationPage';
import ProfileScreen from './ProfilePage';

const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: HomeScreen,  
            navigationOptions:{  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'home'}/>  
                    </View>),  
            }  
        },  
        Notifications: {  
            screen: NotificationsScreen,  
            navigationOptions:{  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'notifications'}/>  
                    </View>),  
            }  
        },  
        Profile: { screen: ProfileScreen,  
            navigationOptions:{  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'person'}/>  
                    </View>),  
            }  
        },  
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#2EEE9D',  
      inactiveColor: '#FFFFFF',  
      barStyle: { backgroundColor: '#2F4052' },  
    },  
);  
  
const NavBar = () =>
{
  return createAppContainer(TabNavigator);
}
export default NavBar;
// export default createAppContainer(TabNavigator);
