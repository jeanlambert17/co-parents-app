import React from 'react'
import { Text, View, StyleSheet, TextInput, Picker } from 'react-native'
import { ListItem } from 'react-native-elements';
import colors from '../../constants/colors';
import commonStyles from './commonStyles';

export default ({ value, onValueChange, title, values }) => (
  <ListItem
    containerStyle={commonStyles.listContainer}
    bottomDivider
    title={
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>{title}</Text>
        <Picker
          mode="dropdown"
          style={styles.picker}
          selectedValue={value}
          onValueChange={(value,i) => onValueChange(value)}
        >
          {values.map((val,i) => <Picker.Item key={i} label={val.label} value={val.value} />)}
        </Picker>
      </View>
    }
  />
)

const styles = StyleSheet.create({
  input: {
    flex:1,
    color:colors.gray,
    marginLeft: 10,
  },
  picker: {
    flex: 1,
    color: colors.headerTitle,
    paddingBottom: 4
  }
})