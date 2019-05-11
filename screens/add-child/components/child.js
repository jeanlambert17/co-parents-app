import React from 'react'
import { 
  View, 
  StyleSheet,
  Dimensions
} from 'react-native';
import { FieldInput } from '../../../components/input';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default ({onFirstNameTextChange, onLastNameTextChange}) => (
  <View>
    <FieldInput
      placeholder="First Name"
      textContentType="name"
      onChangeText={onFirstNameTextChange}
    />
    <FieldInput
      placeholder="Last Name"
      textContentType="familyName"
      onChangeText={onLastNameTextChange}
    />
  </View>
);