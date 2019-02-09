import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { CalendarScreen, AddEventScreen, EditEventScreen } from '../../screens'
import { Icon } from 'react-native-elements';
import colors from '../../constants/colors';

export default createStackNavigator({
  Calendar: CalendarScreen,
  AddEvent: AddEventScreen,
  EditEvent: EditEventScreen
}, {
  initialRouteName: 'Calendar',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({navigation}) => ({
    headerTitleStyle: {
      fontWeight: 'normal',
    },
    headerLeft: (
      <Icon 
        type="material-community" 
        name="menu" 
        color={colors.green} 
        containerStyle={{marginLeft:10}} 
        onPress={() => navigation.openDrawer()}
      />
    ),
    // headerRight: <Icon type="simple-line-icon" name="options-vertical" color={colors.green} containerStyle={{marginRight:10}} onPress={() => console.log('On menu press')}/>
  })
})