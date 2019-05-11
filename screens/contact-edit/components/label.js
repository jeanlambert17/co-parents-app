import React from 'react'
import { 
  View, 
  StyleSheet,
  Dimensions
} from 'react-native'
import { 
  Text 
} from 'react-native-elements';
import colors from '../../../constants/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Label = ({ label, value }) => (
  <View style={styles.container}>
    <View style={styles.labelContainer}>
      <Text style={styles.text}>
        {`${label}:`}
      </Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.text}>
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {    
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.65,
    marginBottom: 1.5,
    marginTop: 1.5
  },
  valueContainer: {
    flex: 3,
    marginLeft: 5
  },
  labelContainer: {
    flex: 1,
  },
  text: {
    color: colors.gray
  }
});


export default Label;