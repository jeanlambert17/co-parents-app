import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Logo } from '../../components';
import { Input } from '../../components/Input';
import { LogInButton } from '../../components/Buttons';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/device';

class SignUp extends Component {

  static navigationOptions = {
    title: 'Sign up',
  };

  state = {
    name: '',
    number: '',
    email: '',
    password: '',
    confirm: ''
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/background_empty.png')} style={styles.background} resizeMode="stretch">
      <KeyboardAvoidingView
        style={{flex: 1}} 
        enabled
      >
        <ScrollView>
          <Logo containerStyle={styles.logoContainer} logoHeight={100} width={100} iconStyle={{marginBottom: -10}}/>
          <View style={styles.signUpContainer}>
            <Input
              containerStyle={styles.inputContainer}
              iconProps={{
                name:"user-circle-o",
                type:"font-awesome"
              }}
              placeholder="Full Name"
              textContentType="familyName"            
              onChangeText={(name) => this.setState({name})}
            />
            <Input
              containerStyle={styles.inputContainer}
              iconProps={{
                name:"md-call",
                type:"ionicon",
                reverse: true,
                color:"white",
                reverseColor:"green",
                size: 10,
                marginRight: -0.5
              }}
              placeholder="Mobile Number"
              textContentType="telephoneNumber"
              onChangeText={(number) => this.setState({number})}
            />
            <Input
              containerStyle={styles.inputContainer}
              iconProps={{
                name:"mail",
                type:"entypo"
              }}
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
              onChangeText={(email) => this.setState({email})}
            />
            <Input
              containerStyle={styles.inputContainer}
              iconProps={{
                name:"lock-outline",
                type:"MaterialCommunityIcons"
              }}
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
            />          
            <Input
              containerStyle={styles.inputContainer}
              iconProps={{
                name:"lock-outline",
                type:"MaterialCommunityIcons"
              }}
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              onChangeText={(confirm) => this.setState({confirm})}
            />
            
            <LogInButton title="SIGN UP" onPress={() => this.props.navigation.navigate('AddChildScreen')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  logoContainer: {
    alignItems:'center'
  },
  signUpContainer: {  
    flex: 1,
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.025,
    width: DEVICE_WIDTH, // * 0.75
  },
  inputContainer: {
    marginBottom: 15
  }
})

export default SignUp;