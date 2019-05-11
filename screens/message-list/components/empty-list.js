import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Text
} from 'react-native-elements';

const EmptyList = () => (
  <View style={styles.container}>
    <Text>
      You don't have any message
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    marginTop:20,
  }
});

export default EmptyList;