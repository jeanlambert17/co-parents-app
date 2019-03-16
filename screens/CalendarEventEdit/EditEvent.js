import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import colors from '../../constants/colors';
import { Icon } from 'react-native-elements';
import TextItem from '../../components/ListItems/Text';
import SwitchItem from '../../components/ListItems/Switch';
import ChevronItem from '../../components/ListItems/Chevron';
import RangeItem from '../../components/ListItems/Range';
import ChildrenItem from '../../components/ListItems/Children';
import DeleteItem from '../../components/ListItems/Delete';
import SelectItem from '../../components/ListItems/Select';
import Loading from '../../components/Loading/loading';
import { deleteEvent } from '../../api/event';
import MessageHandler from '../../utils/MessageHandler';
import { intervalList, frequencyList } from '../../constants/list';

export default class EditEvent extends Component {

  componentDidMount() {
    const event = this.props.navigation.getParam('event', null);
    if (null) this.props.navigation.goBack();
    this.setState({...event});
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Edit Event',
    headerRight: (
      <Icon
        type="material"
        name="check"
        color={colors.green}
        containerStyle={{marginRight:10}}
        onPress={() => {navigation.goBack(); navigation.getParam('updateEvent', null)()}}
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
      loading: false,
      id: -1,
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
      repeat:'',
      isPrivate:false,
      interval:'',
    }
    this.messageHandler = new MessageHandler();
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

  handleRemove = async () => {
    const [id,err] = await deleteEvent(this.props.user.id, this.state.id);
    if(err) {
      this.messageHandler(err);
      return;
    }
    this.props.removeEvent(id);
    this.props.navigation.goBack();
  }

  render() {
    const { name, allDay, start, end, location, note, children, isPrivate, interval, loading, repeat } = this.state;
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
          datetime={start}
          onHourChange={(start) => this.handleChange({start})}
        />
        {/* End */}
        <RangeItem 
          title="End:"
          datetime={end}
          onHourChange={(end) => this.handleChange({end})}
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
        <SelectItem 
          value={repeat}
          onValueChange={(repeat) => this.handleChange({repeat})}
          values={frequencyList}
          title="Repeat: "
        />
        {/* Private */}
        <SwitchItem
          title="Private:"
          value={isPrivate}
          onPress={(isPrivate) => this.handleChange({isPrivate})}
        />
        {/* Interval */}
        <SelectItem 
          value={interval}
          onValueChange={(interval) => this.handleChange({interval})}
          values={intervalList}
          title="Interval: "
        />
        {/* Delete */}
        <DeleteItem 
          title="Delete Event"
          onPress={this.handleRemove}
        />
        <Loading isVisible={loading} />
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})