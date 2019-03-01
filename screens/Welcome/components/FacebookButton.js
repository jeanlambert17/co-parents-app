import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
// import AuthButton from './AuthButton';

class FacebookButton extends Component {

  handleLoginFinished = (err,res) => {
    if(err) {
      console.log('login has errors: ' + res.error);
    } else if(res.isCancelled) {
      console.log('login is cancelled');
    } else {
      AccessToken.getCurrentAccessToken()
      .then(data => {
        console.log(data.accessToken.toString);
      })
    }
  }

  handleLogoutFinished = () => {
    console.log('logout');
  }

  render() {
    
    return (
      <View>
        <LoginButton 
          onLoginFinishe={this.handleLoginFinished}
          onLogoutFinished={this.handleLogoutFinished}
        />
      </View>
    );
  }
}

// const FacebookButton = AuthButton({
//   title: "Log in with Facebook",
//   color: "#395692",
//   iconProps: {
//     type: 'entypo',
//     name:'facebook'
//   }
// });

export default FacebookButton;