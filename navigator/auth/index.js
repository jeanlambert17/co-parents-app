import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { LogInScreen, SignUpScreen, WelcomeScreen, AddChildScreen, AddCoParentScreen, CalendarScreen } from '../../screens'
import { Icon } from 'react-native-elements';


export default createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen
    },    
    SignUpScreen: {
      screen: SignUpScreen
    },
    LogInScreen: {
      screen: LogInScreen,
    },
    AddChildScreen: {
      screen: AddChildScreen
    },
    AddCoParentScreen: {
      screen: AddCoParentScreen
    },
    CalendarScreen: {
      screen: CalendarScreen
    }
  },{
    initialRouteName: 'WelcomeScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerBackImage: <Icon type="ionicon" name="ios-arrow-back" color="#454545" containerStyle={{padding:7.5}}/>
    },
  }
);