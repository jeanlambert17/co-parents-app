import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements';
import { DEVICE_WIDTH } from "../../constants/device";

const _Input = ({ icon, color, borderColor, iconProps, containerStyle, iconContainerStyle, inputStyles, rightIcon: RightIcon, rightIconProps, ...props }) => (
  <Input
    {...props}
    underlineColorAndroid="transparent"
    containerStyle={[styles.container, { borderColor: borderColor ? borderColor : color, ...containerStyle}]}
    placeholderTextColor={color}
    inputStyle={[styles.input, { color, ...inputStyles }]}
    inputContainerStyle={styles.inputContainer}
    leftIcon={
      icon ? (<Icon 
        color={color}
        size={16}
        marginLeft={7.5}
        marginRight={7.5}
        {...iconProps}
      />) : null
    }
    rightIcon={
      RightIcon ? <RightIcon {...rightIconProps}/> : null
    }
    leftIconContainerStyle={[styles.iconContainer, iconContainerStyle]}
  />
);

_Input.defaultProps = {
  editable: true,
  icon: true,
  color: 'white',
  borderColor: null,
  rightIcon: null
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 12.5,
    width: DEVICE_WIDTH * 0.80,
    // borderColor: 'white',
    // paddingVertical: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    marginLeft: 7.5,
    // color: 'white',
  },
  iconContainer: {
    marginLeft: 0,
  }
});

export default _Input;