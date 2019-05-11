import React, { Component } from 'react'
import { ScrollView, View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native'
import Title from '../../components/Title/Title';
import { Avatar, Icon } from 'react-native-elements';
import colors from '../../constants/colors';
import ReloadItem from '../../components/ListItems/Reload';
import { CurvedBackground } from '../../components/Background';
import { handleAvatarProps } from '../../utils/handleProps';
import { updateUser, updatePassword } from '../../api/user';
import MessageHandler from '../../utils/MessageHandler';
import Loading from '../../components/Loading/loading';
import { storage } from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob'

const options = {
  title: 'Choose an avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      name: '',
      phoneNumber: '',
      email: '',
      password: ''
    }
    this.messageHandler = new MessageHandler();
  }

  handleReloadPress = async (toUpdate) => {
    this.setState({loading:true});
    const [user,err] = await updateUser(this.props.user.id, toUpdate);
    this.setState({loading:false});
    if(err) {
      this.messageHandler.errorMessage(err);
      return;
    }
    this.messageHandler.centerMessage(`${toUpdate.fieldName} was updated`);
    this.props.setUser(user);
  }

  handlePasswordChange = async (newPassword) => {
    this.setState({loading:true});
    const [res,err] = await updatePassword(newPassword);
    this.setState({loading:false});
    if(err) {
      this.messageHandler.errorMessage(err);
      return;
    }
    this.messageHandler.centerMessage(res);
  }

  _uploadImage = async(uri,fileName,mime) => {
    const id = this.props.user.id;
    const uploadRef = storage().ref(`/user/${id}`).child('icon.jpg');
    const uploadURI = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    this.setState({loading:true})
    try {
      await uploadRef.putFile(uploadURI, { contentType: mime });
      const url = await uploadRef.getDownloadURL();
      const [user,err] = await updateUser(id, {fieldName:'icon', value:url});
      if(err) throw err;
      this.props.setUser(user);
    } catch(err) {
      this.messageHandler.errorMessage(err.message || err);
    } finally {
      this.setState({loading:false})
    }
  }

  showImagePicker = async() => {
    ImagePicker.showImagePicker(options, (img) => {
      if (img.error) {
        this.messageHandler.errorMessage(img.error);
      } else {
        this._uploadImage(img.uri, img.fileName, img.type);
      }
    });
  }

  render() {
    const { user } = this.props;
    const { name, phoneNumber, email, password, loading } = this.state;
    const avatarProps = handleAvatarProps(user.icon, user.name[0].toUpperCase());
    
    return (
      <CurvedBackground>
        <KeyboardAvoidingView
          style={{flex: 1}} 
          enabled
        > 
          <Loading isVisible={loading} onBackdropPress={() => this.setState({loading:false})} />
          <ScrollView>
            <View style={styles.top}>
              <View style={{alignItems:'center'}}>
                <Avatar
                  onPress={this.showImagePicker}
                  containerStyle={styles.avatarContainer}
                  size="medium"
                  rounded
                  {...avatarProps}
                />
                <Icon 
                  reverseColor={colors.green}
                  containerStyle={{
                    position:'absolute',
                    bottom: 0,
                    borderRadius: 12,
                    backgroundColor:'white'
                  }}
                  size={16}
                  name="reload"
                  type="material-community"
                  color={colors.green}
                  backgroundColor="black"
                />
              </View>
              <Title
                title={user.name}
                subtitle=""
                titleStyle={{color:'white'}}
                subtitleStyle={{color:'white'}}
              />
            </View>
            <View style={styles.body}>
              <ReloadItem 
                placeholder="Full name"
                leftIcon={{              
                  name:"user-circle-o",
                  type:"font-awesome"
                }}
                value={name}
                onChangeText={(name) => this.setState({name})}
                onReloadPress={(value) => this.handleReloadPress({fieldName:'name', value})}
              />
              <ReloadItem 
                placeholder="Mobile Number"
                leftIcon={{
                  name:"md-call",
                  type:"ionicon",
                }}
                value={phoneNumber}
                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                onReloadPress={(value) => this.handleReloadPress({fieldName:'phoneNumber', value})}
              />
              {/* {emailChange && ( */}
                <ReloadItem 
                  placeholder="Change email"
                  leftIcon={{
                    name:"mail",
                    type:"entypo"
                  }}
                  value={email}
                  onChangeText={(email) => this.setState({email})}
                  onReloadPress={(value) => this.handleReloadPress({fieldName:'email', value})}
                />
              {/* )} */}
              {/* {emailChange && ( */}
                <ReloadItem 
                  placeholder="Change Password"
                  leftIcon={{
                    name:"lock-outline",
                    type:"MaterialCommunityIcons"
                  }}
                  value={password}
                  onChangeText={(password) => this.setState({password})}
                  onReloadPress={(value) => this.handleReloadPress({fieldName:'password', value})}
                />
              {/* )} */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </CurvedBackground>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    alignItems:'center',
    marginTop: 15
  },
  avatarContainer: {
    borderWidth: 4,
    borderColor:'white'
  },
  body: {
    marginHorizontal: 15,
    marginTop: 40
  }
})
