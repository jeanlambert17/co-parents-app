import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements';
import colors from '../../constants/colors';
import commonStyles from './commonStyles';
import DateTimePicker from 'react-native-modal-datetime-picker';
export default class RangeItem extends Component {
  state = {
    isTimePickerVisible: false,
    isDatePickerVisible: false,
  };
  _showTimePicker = () => this.setState({ isTimePickerVisible: true });
  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleTimePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.props.onHourChange({
      date: this.props.datetime.date,
      hour: `${(date.hour <= 12)? ((date.hour < 10)? '0' + date.hour : date.hour) : date.hour - 12}:${(date.minute < 10)? '0' + date.minute : date.minute} ${(date.hour < 12)? 'AM' : 'PM'}`
    })
    this._hideTimePicker();
  };
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    let x = new Date(date);
    const month = x.getMonth() + 1;
    const day = x.getDate();
    this.props.onHourChange({
      date: `${x.getFullYear()}-${month < 11 ? '0' + month : month}-${day < 11 ? '0' + day : day}`,
      hour: this.props.datetime.hour
    })
    this._hideDatePicker();
  };

  render() {
    return (
      <ListItem
        containerStyle={commonStyles.listContainer}
        bottomDivider
        title={
          <View style={[commonStyles.container, styles.container]}>
            <Text style={commonStyles.text}>{this.props.title}</Text>
            <View style={styles.textViews}>
              <TouchableOpacity onPress={this._showDatePicker} style={[styles.dateContainer]}>
                <Text style={styles.smallText}>Date:</Text>
                <Text>{this.props.datetime.date}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._showTimePicker} style={[styles.dateContainer, styles.hourContainer]}>
                <Text style={styles.smallText}>Hour:</Text>
                <Text>{this.props.datetime.hour}</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              mode="time"
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
            />
            <DateTimePicker
              mode="date"
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDatePicker}
            />
          </View>
        }
      />
    )
    
  }
}
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