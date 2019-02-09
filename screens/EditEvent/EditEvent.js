import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import colors from '../../constants/colors';
import { Icon, ListItem } from 'react-native-elements';
import { ListItems } from '../../components';

const {
  TextItem,
  SwitchItem,
  ChevronItem,
  RangeItem,
  DeleteItem
} = ListItems;


export default class AddEvent extends Component {

  componentDidMount() {
    // GET DATA FROM NAV
    const event = this.props.navigation.getParam('event', null);
    if (null) this.props.navigation.goBack();
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Edit Event',
    headerRight: (
      <Icon
        type="material"
        name="check"
        color={colors.green}
        containerStyle={{marginRight:10}}
        onPress={() => navigation.getParam('editEvent', null)()}
      />
    ),
    headerLeft: (
      <Icon
        type="material-community" 
        name="window-close" 
        color={colors.gray}
        containerStyle={{marginLeft:10}}
        onPress={() => navigation.goBack()}
      />
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      name:'',
      allDay: false,
      start:{      
        date:"04/01/2019",
        hour:"1:00 PM"
      },
      end:{
        date:"04/01/2019",
        hour:"1:00 PM"
      },
      location:'',
      children:[],
      note:'',
      // repeat:'',
      isPrivate:false,
      interval:'',
    }
  }

  handleChange = (name,prop) => {
    this.setState({[name]:prop});
    this.props.setEvent(this.state);
  }

  handlerSelectChild = (id, selected) => {
    this.setState({
      children: this.state.children.map(child => child.id === id ? { ...child, selected: !selected} : child)
    })
    this.props.setEvent(this.state);
  }

  render() {
    const { name, allDay, start, end, location, note, children, isPrivate, interval } = this.state;
    return (
      <ScrollView style={styles.container}>
       {/* Name field */}
       <TextItem 
          value={name} 
          onChangeText={(name) => this.handleChange('name',name)}
          placeholder="Tennis, school, park with friends..."
          title="Name: "
        />
        {/* All day */}
        <SwitchItem
          title="All day:"
          value={allDay}
          onPress={(allDay) => this.handleChange('allDay',allDay)}
        />
        {/* Start */}
        <RangeItem 
          title="Start:"
          date={start.date}
          hour={start.hour}
        />
        {/* End */}
        <RangeItem 
          title="End:"
          date={end.date}
          hour={end.hour}
        />
        {/* Location */}
        <TextItem 
          value={location} 
          onChangeText={(location) => this.handleChange('location',location)}
          placeholder=""
          title="Location:"
        />
        {/* Note */}
        <TextItem 
          value={note} 
          onChangeText={(note) => this.handleChange('note',note)}
          placeholder="Petar is ill, please be careful"
          title="Note: "
        />
        {/* Repeat */}
        <ChevronItem 
          title="Repeat:"
        />
        {/* Private */}
        <SwitchItem
          title="Private:"
          value={isPrivate}
          onPress={(isPrivate) => this.handleChange('isPrivate',isPrivate)}
        />
        {/* Interval */}
        <TextItem 
          value={interval} 
          onChangeText={(interval) => this.handleChange('interval',interval)}
          placeholder=""
          title="Interval: "
        />
        {/* Delete */}
        <DeleteItem 
          title="Delete Event"
          onPress={() => this.props.navigation.goBack()}
        />
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})