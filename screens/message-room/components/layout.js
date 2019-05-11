import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView,
  ProgressBarAndroid,
  Platform
} from 'react-native';
import CommentBox from './commentBox';
import { FixedFooter } from '../../../components/footer';
import colors from '../../../constants/colors';

const Uploading = Platform.select({
  ios: (props) => <UploadingIOS {...props}/>,
  android: (props) => <UploadingAndroid {...props}/>
})

const Layout = ({ children, scrollRef, text, onChangeText, onAttachmentPress, onSendPress, uploading, progress }) => (
  <KeyboardAvoidingView style={styles.container}>
    <Uploading uploading={uploading} progress={progress} />
    <ScrollView ref={scrollRef}>
      {children}
      <View style={{marginBottom:100}}/>
    </ScrollView>
    <FixedFooter containerStyles={{bottom:0}}>
      <CommentBox
        value={text}
        onChangeText={onChangeText}
        onAttachmentPress={onAttachmentPress}
        onSendPress={onSendPress}
      />
    </FixedFooter>
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: colors.background
  }
});

const UploadingAndroid = ({ uploading, progress }) => (
  <ProgressBarAndroid
    animating={uploading}
    color={colors.green}
    indeterminate={true}
    progress={progress}
  />
);

const UploadingIOS = ({ uploading, progress }) => (
  <View>

  </View>
);

export default Layout;