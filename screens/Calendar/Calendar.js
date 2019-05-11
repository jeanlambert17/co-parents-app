import React from 'react';
// Components
import { 
  View, 
  StyleSheet 
} from 'react-native';
import { 
  Text, 
  Icon 
} from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import Loading from '../../components/loading/loading';
import { FixedFooter } from '../../components/footer';
import { OptionButton } from '../../components/nutton';
import EventList from './components/event-list';
// Http calls
import { createEvent, updateEvent } from '../../api/event';
import { getBasicData } from '../../api/auth';
import MessageHandler from '../../utils/message-handler';
// Contants
import colors from '../../constants/colors';

class _Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      selectedEvent: {},
      markedDates: {},
      loading: false
    }
    this.messageHandler = new MessageHandler();
  }

  componentDidMount() {
    let date = new Date()
    this.setState({
      selected: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        dateString: date.toISOString().slice(0,10)
      }
    });
    this.refreshMarkedDays();
  }

  static navigationOptions = {
    title: 'Calendar',
    headerRight: <OptionButton />
  }

  componentDidUpdate(prevProps){
    if(prevProps.events.length !== this.props.events.length) {
      this.refreshMarkedDays();
    }
  }

  handleOnDayPress = (day) => {
    this.setState({selected: day});
  }

  refreshMarkedDays() {      
    let markedDates = {};
    this.props.events.forEach(evt => {
      markedDates = {
        ...markedDates,
        [evt.start.date]: {
          periods: [
            { startingDay: true, endingDay: true, color: colors.green }
          ]
        }
      }
    })
    this.setState({markedDates})
  }

  handleAddEvent = async () => {
    this.setState({loading:true});
    const [data,err] = await createEvent(this.props.user.id, this.props.event);
    this.setState({loading:false});
    if(err) {
      this.messageHandler.errorMessage(err);
      return;
    }
    this.props.addEvent(data);
  }

  handleEditEvent = async () => {
    this.setState({loading:true});
    const [id,err] = await updateEvent(this.props.user.id, this.props.event);
    this.setState({loading:false});
    if(err) {
      this.messageHandler.errorMessage(err);
      return;
    }
    this.props.updateEvent();
  }

  render() {
    const { selected, markedDates, loading } = this.state;
    const { events } = this.props;
    let selectedDay = events.find(evt => evt.start.date === selected.dateString);
    selectedDay = {[selected.dateString]: { selected: true, periods: selectedDay === undefined ? {} : [{startingDay:true, endingDay:true, color:colors.green}]}}
    const filteredEvents = events.filter(evt => evt.start.date === selected.dateString)

    console.log(events);
    
    return (
      <View style={{flex: 1}}>
        <Loading isVisible={loading} />
        <Calendar
          markedDates={{
            ...markedDates,
            ...selectedDay
          }}
          markingType="multi-period"
          onDayPress={this.handleOnDayPress}
          onMonthChange={(month) => {console.log('month changed', month)}}
          disableMonthChange={true}
          firstDay={1}
          theme={{
            textSectionTitleColor: colors.green,
            selectedDayBackgroundColor:colors.green,
            todayTextColor: colors.green,
            arrowColor: colors.green,
            dayTextColor: colors.gray,
            monthTextColor: colors.green
          }}
        />
        <View style={styles.selectedDayContainer}>
          <Text style={styles.selectedDayText}>{new Date(selected.year,selected.month,selected.day).toDateString()}</Text>
        </View>
        <EventList events={filteredEvents} onEventSelect={(selectedEvent) => this.setState({selectedEvent})} />
        <FixedFooter>
          <Icon
            disabled={this.state.selectedEvent === null ? true : false}
            raised
            reverse
            type="evilicon" 
            name="pencil"
            size={18}
            color="#e0e0e0"
            reverseColor={colors.green}
            containerStyle={{marginLeft:10}}
            onPress={() => this.props.navigation.navigate('EditEvent', { updateEvent: this.handleEditEvent, event: this.state.selectedEvent})}
          />
          <Icon
            raised
            reverse
            type="octicon" 
            name="plus"
            size={18}
            color="#24bfff"
            containerStyle={{marginRight:10}}
            onPress={() => this.props.navigation.navigate('AddEvent', {addEvent:this.handleAddEvent, start:selected})}
          />
        </FixedFooter>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectedDayContainer: {
    marginTop: -7,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e2e2',
    borderBottomWidth:1,
    borderColor: '#7B7B7B'
  },
  selectedDayText: {
    color: colors.green,
    fontSize: 16
  }
})


export default _Calendar;