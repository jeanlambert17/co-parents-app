import React from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  ListItem
} from 'react-native-elements';
import colors from '../../../constants/colors';

const ChatItem = ({ onPress, leftAvatar, title, rightSubtitle, subtitle }) => (
  <ListItem
    Component={TouchableOpacity}
    containerStyle={styles.container}
    titleStyle={styles.title}
    onPress={onPress}
    leftAvatar={leftAvatar}
    title={title}
    subtitle={subtitle}
    rightSubtitle={rightSubtitle}
    rightSubtitleStyle={styles.rightSubtitle}
  />
);

const styles = StyleSheet.create({
  title: {
    color: colors.grayDark,
    fontWeight:'bold'
  },
  container: {
    backgroundColor:'transparent'
  },
  rightSubtitle: {
    color: colors.textLight,
    fontSize: 12
  }
});

export default ChatItem;