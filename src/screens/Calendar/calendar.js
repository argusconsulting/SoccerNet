import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFixturesByDate} from '../../redux/fixturesSlice';
import moment from 'moment';

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.fixtures?.fixturesByDate);

  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'), // Initialize with current date
  );

  console.log('Calendar Data:', data);

  useEffect(() => {
    dispatch(getAllFixturesByDate(selectedDate));
  }, [dispatch, selectedDate]);

  const handleDayPress = day => {
    setSelectedDate(day.dateString); // Update state with selected date
  };

  const Item = ({item}) => {
    const time = moment(item?.starting_at).format('hh:mm A');

    return (
      <View style={tw`bg-[#303649] w-90 py-3 mt-5 self-center rounded-lg`}>
        {/* <View style={tw`flex-row `}>
          <Image
            source={require('../../assets/league_icons/league-3.png')}
            style={tw`w-9 h-9 self-center ml-3`}
          />
          <Text
            style={tw`text-white text-[20px] font-401 leading-tight self-center mx-3 `}>
            Premier League
          </Text>
        </View> */}

        <View style={tw`flex-row ml-5`}>
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            {item?.name}
          </Text>

          <Text
            style={tw`text-[#a2a2a2] text-[18px] font-400 leading-tight self-center mx-3 `}>
            {time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#12122A] flex-1 `}>
      <Calendar
        style={{
          borderWidth: 1,
          borderTopColor: 'gray',
          borderBottomColor: 'gray',
          height: 350,
        }}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#05102E',
          textSectionTitleColor: '#fff',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#fff',
          textDisabledColor: '#a9a9a9',
          arrowColor: 'white',
          indicatorColor: 'white',
          monthTextColor: 'white',
        }}
        onDayPress={handleDayPress}
      />
      <Text
        style={tw`text-[#a3a3a3] text-[18px] font-400 leading-tight self-end mr-5 mt-3 `}>
        Date: {selectedDate}
      </Text>

      {data?.data ? (
        <FlatList
          data={data?.data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={tw` pb-5`}
        />
      ) : (
        <Text
          style={tw`text-[#a3a3a3] text-[28px] font-400 leading-tight self-center  mt-15 `}>
          No data Found!
        </Text>
      )}
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
