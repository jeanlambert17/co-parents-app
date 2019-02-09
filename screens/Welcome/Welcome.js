import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Logo } from '../../components'
import { DEVICE_HEIGHT } from '../../constants/device';

// const DEVICE_HEIGHT = Dimensions.get('window').height;

class Welcome extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/background_empty.png')} style={styles.background} resizeMode="stretch">
        <Logo containerStyle={styles.logoContainer} />
        <View style={styles.options}>
          <Button 
            title="Log in with Facebook"
            color="#395692"
            iconProps={{
              type:"entypo",
              name:"facebook",
              size: 20,
              color: 'white',
              marginLeft: 5
            }}
            containerStyle={styles.buttonContainer}
            onPress={() => console.log('facebook')}
          />
          <Button
            title="Log in with email"
            iconType="MaterialIcons"
            iconName="email"
            iconProps={{
              type:"MaterialIcons",
              name:"email",
              size: 20,
              color: 'white',
              marginLeft: 5
            }}
            color="#EE3737"
            containerStyle={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('LogInScreen')}
          />
          <Button 
            title="Sign up"
            color="#EDEDED"
            iconProps={{
              type:"font-awesome",
              name:"user-plus",
              size: 20,
              color:"#4E504D",
              marginLeft: 5
            }}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  options: {
    flex: 1,
    alignItems:'center',
    marginTop: DEVICE_HEIGHT * 0.1
  },
  logoContainer: {
    marginTop: 25,
    alignItems: 'center'
  },
  buttonContainer: {
    marginBottom: 15
  },
  buttonTitle: {
    color: '#515450'
  }
})

export default Welcome;