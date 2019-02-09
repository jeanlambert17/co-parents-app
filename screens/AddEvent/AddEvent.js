import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import colors from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { ListItems } from '../../components';

const {
  TextItem,
  SwitchItem,
  ChevronItem,
  RangeItem,
  ChildrenItem
} = ListItems;


export default class AddEvent extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Event',
    headerRight: (
      <Icon
        type="material"
        name="check"
        color={colors.green}
        containerStyle={{marginRight:10}}
        underlayColor={colors.textLight}
        onPress={() => {navigation.getParam('addEvent', null)(); navigation.goBack()}}
      />
    ),
    headerLeft: (
      <Icon
        type="material-community" 
        name="window-close" 
        color={colors.gray}
        underlayColor={colors.textLight}
        containerStyle={{marginLeft:10}}
        onPress={() => navigation.goBack()}
      />
    )
  })

  componentDidMount() {
    const { children, navigation } = this.props;
    const date = navigation.getParam('start').dateString;
    this.setState({
      children: children.map(child => ({...child, selected: false})),
      start: {date, hour: '8:00 AM'},
      end: {date, hour: '8:00 AM'}
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      name:'',
      allDay: false,
      start:{      
        date:"04/01/2019",
        hour:"8:00 AM"
      },
      end:{
        date:"04/01/2019",
        hour:"8:00 AM"
      },
      location:'',
      children:[],
      note:'',
      // repeat:'',
      isPrivate:false,
      interval:'',
    }
  }

  handleChange = (prop) => {
    let state = this.state;
    state = {
      ...state,
      ...prop,
    }
    this.setState({...state});
    this.props.setEvent(state);
  }

  handlerSelectChild = (id, selected) => {
    let state = this.state;
    state = {
      ...state,
      children: state.children.map(child => child.id === id ? { ...child, selected: !selected} : child)
    }
    this.setState({...state})
    this.props.setEvent(state);
  }

  render() {
    const { name, allDay, start, end, location, note, children, isPrivate, interval } = this.state;
    console.log(this.props.events)
    return (
      <ScrollView style={styles.container}>
        {/* Name field */}
        <TextItem 
          value={name} 
          onChangeText={(name) => this.handleChange({name})}
          placeholder="Tennis, school, park with friends..."
          title="Name: "
        />
        {/* All day */}
        <SwitchItem
          title="All day:"
          value={allDay}
          onPress={(allDay) => this.handleChange({allDay})}
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
          onChangeText={(location) => this.handleChange({location})}
          placeholder=""
          title="Location:"
        />
        {/* Children */}
        <ChildrenItem 
          children={children}
          onPress={this.handlerSelectChild}
        />
        {/* Note */}
        <TextItem 
          value={note} 
          onChangeText={(note) => this.handleChange({note})}
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
          onPress={(isPrivate) => this.handleChange({isPrivate})}
        />
        {/* Interval */}
        <TextItem 
          value={interval} 
          onChangeText={(interval) => this.handleChange({interval})}
          placeholder=""
          title="Interval: "
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