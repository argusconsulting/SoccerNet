import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import ScoreCard from '../../components/score-card/score-card';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFixturesByDateRangeHighlights} from '../../redux/fixturesSlice';
import Loader from '../../components/loader/Loader';

const JustFinished = () => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [monthRange, setMonthRange] = useState({start: '', end: ''});
  const [page, setPage] = useState(1);
  const isLoading = useSelector(state => state?.fixtures?.isLoading);
  const [allHighlights, setAllHighlights] = useState([]); // Accumulate all loaded data

  const highlightData = useSelector(
    state => state?.fixtures?.fixturesByDateRangeHighlights,
  );

  const getWeekRange = date => {
    const end = moment(date).subtract(1, 'day').format('YYYY-MM-DD');
    const start = moment(end).subtract(7, 'days').format('YYYY-MM-DD');
    setMonthRange({start, end});
  };

  useEffect(() => {
    getWeekRange(moment());
  }, []);

  const loadHighlights = async () => {
    if (monthRange.start && monthRange.end) {
      const response = await dispatch(
        getAllFixturesByDateRangeHighlights({
          start: monthRange.start,
          end: monthRange.end,
          page,
        }),
      );

      if (response?.payload?.data) {
        // Append new data to previously loaded data
        setAllHighlights(prevData => [...prevData, ...response.payload.data]);
      }
    }
  };

  useEffect(() => {
    loadHighlights();
  }, [monthRange, page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="Just Finished" />
      <View style={tw``}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            ref={flatListRef}
            data={allHighlights}
            renderItem={({item}) => (
              <ScoreCard
                match={item}
                width={'96%'}
                screen={'highlight'}
                navigate={'HighlightDetail'}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={tw`px-3 pb-25`}
            ListFooterComponent={
              <View style={tw`flex-row justify-center mt-7`}>
                {highlightData?.pagination?.has_more && (
                  <TouchableOpacity
                    onPress={handleNextPage}
                    style={tw`bg-blue-400 w-30 h-8 rounded-lg justify-center`}>
                    <Text
                      style={tw`text-white text-[18px] font-401 leading-tight self-center`}>
                      Next
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default JustFinished;

const styles = StyleSheet.create({});
