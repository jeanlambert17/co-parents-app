import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import colors from '../../constants/colors';

const list = [
  {
    title: 'Apposintments',
    icon: 'av-timer',
    type: 'task'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    type:'task'
  },
  {
    title: 'Appointments',
    icon: 'av-timer',
    type:'task'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    type:'task'
  },
]

class EventList extends Component {

  renderAssigment = (item,i) => {
    switch(item.type) {
      case 'task': {
        return <ListItem
          containerStyle={styles.itemContainer}
          key={i}
          title={item.title}
          leftIcon={{
            color: colors.green,
            raised:true,
            type: 'foundation',
            name: 'clipboard-notes'
          }}
        />
      }
      case 'child': {
        return <ListItem 
          key={i}
          title={item.title}
          leftIcon={{name:item.icon}}
        />
      }
    }
  }

  render() {
    return (
      <ScrollView>
        {list.map((item,i) => this.renderAssigment(item,i))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 2,
    paddingBottom: 2
  }
});

export default EventList;