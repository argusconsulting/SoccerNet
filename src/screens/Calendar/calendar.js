import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllFixturesByDate,
  getAllFixturesByDateRange,
} from '../../redux/fixturesSlice';
import moment from 'moment';

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.fixtures?.fixturesByDate);

  const dataByRange = useSelector(
    state => state?.fixtures?.fixturesByDateRange,
  );

  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'), // Initialize with current date
  );
  const [monthRange, setMonthRange] = useState({start: '', end: ''});
  const [markedDates, setMarkedDates] = useState({});

  const getMonthRange = date => {
    const start = moment(date).startOf('month').format('YYYY-MM-DD');
    const end = moment(date).endOf('month').format('YYYY-MM-DD');
    setMonthRange({start, end});
  };

  const markDatesWithMatches = data => {
    const marks = {};
    data?.forEach(item => {
      const date = moment(item.starting_at).format('YYYY-MM-DD'); // Extract date
      marks[date] = {
        marked: true,
        dotColor: '#00adf5',
        activeOpacity: 0, // Optional to reduce opacity effect
      };
    });
    setMarkedDates(marks); // Update marked dates state
  };

  useEffect(() => {
    getMonthRange(moment());
  }, []);

  useEffect(() => {
    dispatch(getAllFixturesByDate(selectedDate));
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (monthRange.start && monthRange.end) {
      dispatch(
        getAllFixturesByDateRange({
          start: monthRange.start,
          end: monthRange.end,
        }),
      );
    }
  }, [dispatch, monthRange]);

  useEffect(() => {
    if (dataByRange?.length) {
      markDatesWithMatches(dataByRange); // Mark dates when data is available
    }
  }, [dataByRange]);

  const handleDayPress = day => {
    setSelectedDate(day.dateString); // Update state with selected date
  };

  const handleMonthChange = month => {
    // Calculate month range whenever the user switches months
    const {year, month: monthIndex} = month;
    const newDate = moment(`${year}-${monthIndex}-01`, 'YYYY-MM-DD');
    getMonthRange(newDate);
  };

  const Item = ({item}) => {
    const time = moment(item?.starting_at).format('hh:mm A');

    return (
      <View style={tw`bg-[#303649] w-90 py-3 mt-5 self-center rounded-lg`}>
        <View style={tw`flex-row ml-5`}>
          <Image
            source={{uri: item?.participants?.[0]?.image_path}}
            style={[tw`w-6 h-6`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            {item?.participants?.[0]?.name}
          </Text>
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            v/s
          </Text>
          <Image
            source={{uri: item?.participants?.[1]?.image_path}}
            style={[tw`w-6 h-6`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            {item?.participants?.[1]?.name}
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
        onMonthChange={handleMonthChange}
        markedDates={markedDates}
      />
      <Text
        style={tw`text-[#a3a3a3] text-[18px] font-400 leading-tight self-end mr-5 mt-3 `}>
        Date: {selectedDate}
      </Text>

      {console.log('data?.data', data?.data)}
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
