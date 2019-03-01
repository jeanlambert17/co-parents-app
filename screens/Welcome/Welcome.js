// Modules
import React, { Component } from 'react'
import { 
  StyleSheet, 
  View, 
  ImageBackground,
  Dimensions
} from 'react-native';
// Reusable components
import Logo from '../../components/Logo';
// Scene's components
import FacebookButton from './components/FacebookButton';
import EmailButton from './components/EmailButton';
import SignUpButton from './components/SignUpButton';

// Variables
const height = Dimensions.get('window').height;

// Class component
class Welcome extends Component {
  render() {
    return (
      <ImageBackground source={require('../../assets/background_empty.png')} style={styles.background} resizeMode="stretch">
        <Logo 
          containerStyle={styles.logoContainer}
        />
        <View style={styles.options}>
          <FacebookButton
            onPress={() => console.log('facebook')}
          />
          <EmailButton 
            onPress={() => this.props.navigation.navigate('LogInScreen')}
          />
          <SignUpButton 
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          />
        </View>
      </ImageBackground>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  options: {
    flex: 1,
    alignItems:'center',
    marginTop: height * 0.1
  },
  logoContainer: {
    marginTop: 25,
    alignItems: 'center'
  }
});

export default Welcome;