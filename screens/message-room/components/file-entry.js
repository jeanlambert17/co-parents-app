import React from 'react';
import { 
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text
} from 'react-native';
import { 
  Avatar,
  Icon
} from 'react-native-elements';
import { handleAvatarProps } from '../../../utils/handle-props';
import colors from '../../../constants/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function FileEntry({me, icon, title, value, downloading, onPress, exists}) {
  const avatarProps = handleAvatarProps(icon,title);
  
  return (
    <View style={{
      marginLeft: 10,
      flex: 1,
      flexDirection: me? 'row-reverse' : 'row',
      marginTop: 20
    }}>
      <Avatar
        rounded
        {...avatarProps}
      />
        <Icon 
          type="material-community"
          name="file"
          size={32}
          color={colors.green}
          containerStyle={styles.iconContainer}
          onPress={onPress}
        />
        {((downloading !== null) && (downloading === value))  && (
          <ActivityIndicator 
            size="small"
            color={colors.green}
          />
        )}
        {!exists && (
          <Icon 
            type="material-community"
            name="download"
            size={24}
            color={colors.gray}
            containerStyle={[styles.iconContainer, {marginTop: 3}]}
            onPress={onPress}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 10,
    marginLeft: 5,
  },  
  talkBubble: {
    backgroundColor: 'transparent'
  },
  talkBubbleSquare: {
    minHeight: 40,
    maxWidth: DEVICE_WIDTH * 0.5,
    borderRadius: 15,
    zIndex: 1000,
    justifyContent:'center'
  },
  text: {
    marginHorizontal: 15,
    marginVertical: 5
  }
});