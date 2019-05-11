import React, { Component } from 'react';
import { 
  ActivityIndicator, 
  View, 
  StyleSheet 
} from 'react-native';
import colors from '../../constants/colors';
import { authenticate } from '../../api/auth';

class Loading extends Component {
  constructor(props) {
    super(props);

    this._authenticate();
  }

  _authenticate = async () => {
    const [data,auth] = await authenticate();
    if(!auth) {
      this.props.navigation.navigate('AuthNavigator');
    } else {
      this.props.setUser(data.user, data.facebook);
      this.props.setData(data.info);
      this.props.navigation.navigate('MainNavigator');
    }
  }

   render() {

    return (      
      <View style={styles.container}>
        <ActivityIndicator 
          size="large" 
          color={colors.green}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
})

export default Loading;