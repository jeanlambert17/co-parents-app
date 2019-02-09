import React from 'react';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import CalendarNavigator from './calendar';
import AuthNavigator from './auth';
import colors from '../constants/colors';
import { Drawer } from '../components';

const mainNavigator = createDrawerNavigator(
  {
    HomeNavigator: {
      screen: CalendarNavigator,
      navigationOptions: {
        title:'Home'
      }
    },
    CalendarNavigator: {
      screen: CalendarNavigator,
      navigationOptions: {
        title:'Calendar'
      }
    },
    CheckNavigator: {
      screen: CalendarNavigator,
      navigationOptions: {
        title:'Check'
      }
    },
  }, {
    initialRouteName: 'CalendarNavigator',
    contentComponent: props => <Drawer {...props} />,
    drawerBackgroundColor: colors.background,
    contentOptions: {
      activeTintColor: colors.green,
      inactiveTintColor: colors.gray,
      labelStyle: {
        fontWeight: 'normal',
      }
    }
  }
)

const nav = createSwitchNavigator(
  {
    AuthNavigator: AuthNavigator,
    MainNavigator: mainNavigator
  }, {
    initialRouteName: 'MainNavigator',
  }
);

export default createAppContainer(nav);