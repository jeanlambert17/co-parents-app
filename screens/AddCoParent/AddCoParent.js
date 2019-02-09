import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Input, Button } from '../../components'
import { DEVICE_WIDTH } from '../../constants/device';

class AddCoParent extends Component {

  static navigationOptions = {
    title: 'Add co-parent info',
    headerTitleStyle: {
      fontWeight: 'normal',
      color: '#8f8f8f'
    },
    headerStyle: {
      backgroundColor:'#f6f6f6'
    },
  };

  state = {
    firstname:'',
    lastname:''
  }

  render() {

    return (
      <ImageBackground source={require('../../assets/background_after_sign_up.png')} style={styles.background} resizeMode="stretch">
      <View style={styles.container}>
        <Input
          icon={false}
          color="#545454"
          borderColor="#beb8b6"
          containerStyle={styles.inputContainer}
          placeholder="First Name"
          textContentType="name"
          onChangeText={(firstname) => this.setState({firstname})}
        />
        <Input
          icon={false}
          color="#545454" //
          borderColor="#beb8b6"
          containerStyle={styles.inputContainer}
          placeholder="Last Name"
          textContentType="familyName"
          onChangeText={(lastname) => this.setState({lastname})}
        />
        <Button 
          title="Invite co-parent"
          color="#3670B9"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          onPress={() => console.log('Invite co-parent pressed')}
        />
        <Button 
          title="CONFIRM"
          color="#82c84f"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          onPress={() => this.props.navigation.navigate('CalendarNavigator')}
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
  container: {
    flex:1,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    marginTop:30
  },
  inputContainer: {
    marginBottom: 15
  },
  buttonContainer: {
    marginBottom: 15,
  },
  buttonTitle: {
    color: 'white'
  },
  buttonStyle: {
    borderWidth: 1.5,
    borderColor:'#c8c8c4',
  }
})

export default AddCoParent;