import { createSwitchNavigator, createAppContainer, } from 'react-navigation';
import authNavigator from './auth';
import drawerNavigator from './drawer';
import LoadingScreen from '../screens/loading';

const nav = createSwitchNavigator(
  {
    AuthNavigator: authNavigator,
    MainNavigator: drawerNavigator,
    Loading: LoadingScreen
  }, {
    initialRouteName: 'Loading',
    // initialRouteName: 'MainNavigator',
  }
);

export default createAppContainer(nav);