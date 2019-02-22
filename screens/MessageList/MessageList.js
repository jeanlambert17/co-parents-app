import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements';
import colors from '../../constants/colors';
import moment from 'moment';

export default class MessageList extends Component {

  renderItem(item,i) {
    const { messages } = item;
    return <ListItem
      onPress={() => this.props.navigation.navigate('MessageRoom', {item})}
      Component={TouchableOpacity}
      containerStyle={styles.itemContainer}
      titleStyle={styles.itemTitle}
      key={i}
      leftAvatar={{
        source: item.source,
        title: item.firstname[0].toUpperCase()
      }}
      title={`${item.firstname} ${item.lastname}`}
      titleStyle={{
        color:colors.textDark
      }}
      subtitle={messages[messages.length-1].text}
      rightSubtitle={moment(messages[messages.length-1].date).fromNow()}
      rightSubtitleStyle={{
        color: colors.textLight,
        fontSize: 12
      }}
    />
  }

  render() {
    console.log(this.props.conversations)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.conversations.map((c,i) => this.renderItem(c,i))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background
  },
  itemTitle: {
    color: colors.grayDark,
    fontWeight:'bold'
  },
  itemContainer: {
    backgroundColor:'transparent'
  }
});