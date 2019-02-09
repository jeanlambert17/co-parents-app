import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/device';
import { Input, Logo, LogInButton } from "../../components";

class LogIn extends Component {

  static navigationOptions = {
    title: 'Log in',
  };

  state = {
    checked: true,
    email: '',
    password: '',
  }

  handleChecked = () => this.setState({ checked: !this.state.checked });

  render() {
    return (
      <ImageBackground source={require('../../assets/background_empty.png')} style={styles.background} resizeMode="stretch">
        <KeyboardAvoidingView enabled style={{flex:1}}>
          <ScrollView>
            <Logo containerStyle={{alignItems:'center'}}/>
            <View style={styles.loginContainer}>
              <Input
                iconProps={{
                  name:"mail",
                  type:"entypo"
                }}
                placeholder="Email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
              />
              <View style={{height: 15}}/>
              <Input
                iconProps={{
                  name:"lock-outline",
                  type:"MaterialCommunityIcons"
                }}
                placeholder="Password"
                textContentType="password"
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
              />
              <View style={styles.options}>
                <CheckBox
                  checked={this.state.checked}
                  title="Remember me"
                  iconType="ionicon"
                  checkedIcon="ios-checkbox-outline"
                  uncheckedIcon="md-square-outline"
                  checkedColor="white"
                  onPress={this.handleChecked}
                  containerStyle={styles.checkedContainer}
                  textStyle={styles.checkedText}
                  size={24}
                />
                <Text
                  style={styles.forgotPassword}
                  onPress={() => console.log('Forgot password pressed')}
                >Forgot password?</Text>
              </View>
              <LogInButton onPress={() => console.log(this.state)} />
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
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems:'center',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.025,
    width: DEVICE_WIDTH, // * 0.75
  },
  options: {
    width: DEVICE_WIDTH * 0.8,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  checkedContainer: {
    backgroundColor:'transparent',
    marginVertical: 0,
    marginLeft: 0,
    borderWidth: 0,
  },
  checkedText: {
    color:'white',
    marginLeft: 0,
    fontSize:9,
  },
  forgotPassword: {
    color:'white'    
  }
})

export default LogIn;