import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import ScoreCard from '../../components/score-card/score-card';
import {matches} from '../../helpers/dummyData';
import {useDispatch, useSelector} from 'react-redux';
import {getLiveScoresInPlay} from '../../redux/liveScoreSlice';

const LiveNow = () => {
  const dispatch = useDispatch();
  const inPlayLiveScores = useSelector(
    state => state?.liveScore?.liveScoreInPlayData,
  );

  useEffect(() => {
    dispatch(getLiveScoresInPlay());
  }, []);
  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="LiveNow" />
      <View style={tw``}>
        {inPlayLiveScores?.data?.length > 0 ? (
          <FlatList
            data={inPlayLiveScores?.data}
            renderItem={({item}) => (
              <ScoreCard
                match={item}
                width={'96%'}
                screen={'liveNow'}
                navigate={'LiveDetails'}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={tw`px-3`}
          />
        ) : (
          <Text
            style={tw`text-[#fff] text-[20px] font-401 leading-tight  mt-5 self-center px-5`}>
            No Data Found !
          </Text>
        )}
      </View>
    </View>
  );
};

export default LiveNow;

const styles = StyleSheet.create({});
