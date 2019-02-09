import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { ListItem, Input } from 'react-native-elements';
import colors from '../../constants/colors';
import commonStyles from './commonStyles';

export default (props) => (
  <ListItem
    containerStyle={commonStyles.listContainer}
    bottomDivider
    title={
      <View style={[commonStyles.container, styles.container]}>
        <Text style={commonStyles.text}>{props.title}</Text>
        <View style={styles.textViews}>
          <View style={styles.dateContainer}>
            <Text style={styles.smallText}>Date:</Text>
            <Text>{props.date}</Text>
          </View>
          <View style={[styles.dateContainer, styles.hourContainer]}>
            <Text style={styles.smallText}>Hour:</Text>
            <Text>{props.hour}</Text>
            {/* <TextInput style={{height: 20}}>
            </TextInput> */}
          </View>
        </View>
      </View>
    }
  />
)

const styles = StyleSheet.create({
  container: {
    justifyContent:'space-between',
    // backgroundColor:'red',
  },
  textViews: {
    flexDirection: 'row',
  },
  dateContainer: {
    marginRight: 20,
    paddingTop: 2,
    paddingBottom: 2
  },
  hourContainer: {
    paddingLeft: 5,
    borderLeftWidth: 1, 
    borderLeftColor: colors.gray
  },
  smallText: {
    fontSize: 9,
    color: colors.textLight
  }
});