import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/device';

const Logo = ({ width, logoHeight, textHeight, containerStyle, iconStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image 
        source={require('../../assets/logo_icon_ellipse_256.png')} 
        style={[styles.logo, { width, height: logoHeight, ...iconStyle }]}
      />
      <Image 
        source={require('../../assets/logo.png')} 
        style={[styles.text, { width, height: textHeight }]}
        resizeMode="center" 
      />
    </View>
  );
}

Logo.defaultProps = {
  width: DEVICE_WIDTH * 0.5,
  logoHeight: DEVICE_HEIGHT * 0.3,
  textHeight: DEVICE_HEIGHT * 0.1
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },  
  logo: {
    zIndex: 100,
  },
  text: {
    zIndex: 1,
  },
})

export default Logo;