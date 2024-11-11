import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import Header from '../../../components/header/header';
import tw from '../../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {getFixturesById} from '../../../redux/fixturesSlice';
import moment from 'moment';
const News = lazy(() => import('../../news/news'));
const Commentary = lazy(() =>
  import('../../../components/detail-modules/commentary'),
);
const Standings = lazy(() =>
  import('../../../components/detail-modules/standings'),
);

const LiveDetails = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const fixtureId = route?.params?.fixtureId;

  const detailData = useSelector(state => state?.fixtures?.fixturesById);

  console.log('detail', detailData);

  useEffect(() => {
    dispatch(getFixturesById(fixtureId));
  }, []);

  // Function to extract scores for home and away teams
  const homeTeam = detailData?.participants?.find(
    participant => participant?.meta?.location === 'home',
  );
  const awayTeam = detailData?.participants?.find(
    participant => participant?.meta?.location === 'away',
  );

  let homeScore = 0;
  let awayScore = 0;

  // Sum up the scores based on the participant_id
  detailData?.scores?.forEach(score => {
    if (
      score.score.participant === 'home' &&
      score.participant_id === homeTeam.id
    ) {
      homeScore += score.score.goals;
    } else if (
      score.score.participant === 'away' &&
      score.participant_id === awayTeam.id
    ) {
      awayScore += score.score.goals;
    }
  });

  const detailsType = [
    {
      id: 1,
      name: 'Commentary',
    },
    {
      id: 2,
      name: 'Standings',
    },
    {
      id: 3,
      name: 'News',
    },
  ];

  const [type, setType] = useState('Commentary');

  const renderItem = ({item}) => (
    <View style={tw``}>
      <TouchableOpacity
        style={[tw`h-7`, {paddingHorizontal: 20}]}
        onPress={() => setType(item.name)}>
        <Text style={[tw`text-[#fff] text-[18px] font-400 self-center`]}>
          {item.name}
        </Text>
        {type === item.name && (
          <View style={tw`border-b-2 border-[#fff] w-full  self-center`} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="" />

      <View style={[tw`  mt-2 mx-5`]}>
        <View style={tw`flex-row justify-between`}>
          <Image
            source={{uri: detailData?.league?.image_path}}
            style={tw`w-5 h-5 mt-2 ml-3`}
          />
          <Text
            style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5`}>
            {moment(detailData?.starting_at).format('MMMM Do YYYY')}
          </Text>

          <Text
            style={tw`text-red-500 text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
            Live
          </Text>
        </View>

        <View style={tw`flex-row justify-between mx-12 mt-3`}>
          <View>
            <Image
              source={{uri: homeTeam?.image_path}}
              style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5 `}>
              {homeTeam?.name}
            </Text>
          </View>
          <Text
            style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 ml-3`}>
            {homeScore}
          </Text>
          <Text
            style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 `}>
            -
          </Text>
          <Text
            style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
            {awayScore}
          </Text>
          <View>
            <Image
              source={{uri: awayTeam?.image_path}}
              style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5`}>
              {awayTeam?.name}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View style={tw` border-t pt-3 ml-3 border-[#3e3e3e] mt-10 `} />
        <FlatList
          data={detailsType}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row justify-between mx-3`}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <View style={tw` border-b pt-3 ml-3 border-[#3e3e3e] `} />
      </View>

      <Suspense fallback={<Text>Loading...</Text>}>
        {type === 'Standings' && <Standings />}
        {type === 'News' && <News shownHeader={false} />}

        {type === 'Commentary' && <Commentary />}
      </Suspense>
    </View>
  );
};

export default LiveDetails;

const styles = StyleSheet.create({});
