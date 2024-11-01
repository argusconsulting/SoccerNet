import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import ScoreCard from '../../components/score-card/score-card';
import {matches} from '../../helpers/dummyData';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFixturesByDateRangeHighlights} from '../../redux/fixturesSlice';

const Highlights = () => {
  const dispatch = useDispatch();
  const [monthRange, setMonthRange] = useState({start: '', end: ''});
  const highlightData = useSelector(
    state => state?.fixtures?.fixturesByDateRangeHighlights,
  );

  console.log('in highlights', highlightData);

  const getWeekRange = date => {
    // Set the end date to yesterday
    const end = moment(date).subtract(1, 'day').format('YYYY-MM-DD');

    // Set the start date to seven days before yesterday
    const start = moment(end).subtract(7, 'days').format('YYYY-MM-DD');

    setMonthRange({start, end});
  };

  useEffect(() => {
    getWeekRange(moment()); // Initialize with current month
  }, []);

  useEffect(() => {
    if (monthRange.start && monthRange.end) {
      dispatch(
        getAllFixturesByDateRangeHighlights({
          start: monthRange.start,
          end: monthRange.end,
        }),
      );
    }
  }, [dispatch, monthRange]);

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Highlights" />
      <View style={tw``}>
        <FlatList
          data={highlightData}
          renderItem={({item}) => {
            return (
              <ScoreCard
                match={item}
                width={'96%'}
                screen={'highlight'}
                navigate={'HighlightDetail'}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`px-3 pb-25`}
        />
      </View>
    </View>
  );
};

export default Highlights;

const styles = StyleSheet.create({});
