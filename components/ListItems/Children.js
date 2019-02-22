import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import commonStyles from './commonStyles';
import colors from '../../constants/colors';

export default ({children, onPress}) => (
  <ListItem
    containerStyle={styles.listContainer}
    bottomDivider
    title={
      <View style={styles.container}>
        <Text style={commonStyles.text}>Children: </Text>
        <View style={styles.childrenList}>
          {children.map((child,i) => (
            <Child
              key={i}
              name={child.firstname}
              icon={child.icon}
              selected={child.selected}
              onPress={() => onPress(child.id, child.selected)}
            />
          ))}
        </View>
      </View>
    }
  />
)

const Child = (props) => {
  const containerStyles = props.selected ? {borderWidth: 2, borderColor:colors.green} : null;
  return (
    <View style={styles.childContainer}>
      <Avatar
        containerStyle={containerStyles}
        rounded
        title={props.name[0].toUpperCase()}
        source={{uri:props.icon}}
        editButton={{
          name:'sc-telegram',
          type:'evilicon',
        }}
        onPress={props.onPress}
      />
      <Text style={styles.childText}>{props.firstname}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {  
    paddingBottom: 5, 
    paddingTop: 5,
  },
  container: {
    marginTop: 5,
    marginBottom: 10
  },
  childrenList: {
    flexDirection: 'row',
    marginTop: 5,
  },
  childContainer: {
    flexDirection:'row',
    alignItems: 'center',
    marginRight: 10
  },
  childText: {
    marginLeft:3
  }
})