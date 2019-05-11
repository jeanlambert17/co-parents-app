import React from 'react'
import { Icon } from 'react-native-elements';

export default ({ onPress }) => (
  <Icon
    raised
    reverse
    type="octicon" 
    name="plus"
    size={18}
    color="#24bfff"
    containerStyle={{marginRight:10}}
    onPress={onPress}
  />
);