import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { MyFamilyScreen } from '../../screens'
import MenuIcon from '../commons/menu-icon';
import OptionIcon from '../commons/option-icon';
import { stackOptions } from '../commons/options';

export default createStackNavigator({
  MyFamily: {
    screen: MyFamilyScreen,
    navigationOptions: ({navigation}) => ({
      title: 'My Family',
      headerLeft: <MenuIcon navigation={navigation} />,
      headerRight: <OptionIcon />
    })
  }
}, stackOptions('MyFamily'));