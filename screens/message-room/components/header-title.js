import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text 
} from 'react-native';
import { 
  Avatar
} from 'react-native-elements';
import colors from '../../../constants/colors';
import { handleAvatarProps } from '../../../utils/handle-props';

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center'
  },
  text: {
    color: colors.gray,
    marginLeft: 5,
    fontSize: 16
  },
});

export default function HeaderTitle({icon,name}) {
  const avatarProps = handleAvatarProps(icon,name[0].toUpperCase());
  return (
    <View style={styles.container}>
      <Avatar 
        rounded
        {...avatarProps}
      />
      <Text style={styles.text}>
        {name}
      </Text>
    </View>
  );
}