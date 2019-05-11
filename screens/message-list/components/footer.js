import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Text
} from 'react-native-elements';
import AddButton from '../../../components/Button/Add';

const Footer = ({ onAddPress }) => (
  <View style={styles.container}>
    <AddButton 
      onPress={onAddPress}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems:'center'
  }
});

export default Footer;