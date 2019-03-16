import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Input } from 'react-native-elements';
import colors from '../../constants/colors';
import commonStyles from './commonStyles';

export default ({placeholder,leftIcon,onReloadPress,onChangeText,value}) => (
  <ListItem
    containerStyle={[commonStyles.listContainer, styles.container]}
    bottomDivider
    title={(
      <Input 
        onChangeText={onChangeText}
        placeholderTextColor={colors.textDark}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        inputContainerStyle={{
          borderBottomWidth:0,
          marginLeft: -15
        }}
      />
    )}
    leftIcon={{
      ...leftIcon,
      color: colors.green,
      size: 16
    }}
    rightIcon={{
      type:'material-community',
      name:'reload',
      color:colors.green,
      onPress: () => onReloadPress(value)
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomColor: colors.green
  }
});