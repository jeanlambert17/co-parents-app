import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/device';
import { Input } from '../../components';

const Child = ({onFirstNameTextChange, onLastNameTextChange}) => (
  <View>
    <Input
      icon={false}
      color="#535353"
      borderColor="#c8c7c3"
      containerStyle={styles.inputContainer}
      placeholder="First Name"
      textContentType="name"
      onChangeText={onFirstNameTextChange}
    />
    <Input
      icon={false}
      color="#535353"
      borderColor="#c8c7c3"
      containerStyle={styles.inputContainer}
      placeholder="Last Name"
      textContentType="familyName"
      onChangeText={onLastNameTextChange}
    />
  </View>
);

const styles = StyleSheet.create({  
  inputContainer: {
    marginBottom: 15
  },
});

export default Child;