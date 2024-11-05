import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import tw from '../../../styles/tailwind';
import Header from '../../../components/header/header';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {getFixturesById} from '../../../redux/fixturesSlice';
import moment from 'moment';
const Summary = lazy(() =>
  import('../../../components/detail-modules/summary'),
);
const Commentary = lazy(() =>
  import('../../../components/detail-modules/commentary'),
);
const Standings = lazy(() =>
  import('../../../components/detail-modules/standings'),
);
const Players = lazy(() =>
  import('../../../components/detail-modules/players'),
);
const Statistics = lazy(() =>
  import('../../../components/detail-modules/statistics'),
);

const HighlightDetail = () => {
  const route = useRoute();
  const detailsType = [
    {
      id: 1,
      name: 'Summary',
    },
    {
      id: 2,
      name: 'Statistics',
    },
    {
      id: 3,
      name: 'Standings',
    },
    {
      id: 4,
      name: 'Players',
    },
    {
      id: 5,
      name: 'Commentary',
    },
  ];

  const [type, setType] = useState('Summary');
  const dispatch = useDispatch();
  const fixtureId = route?.params?.fixtureId;
  const detailData = useSelector(state => state?.fixtures?.fixturesById);

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

  const renderItem = ({item, index}) => {
    const isLastItem = index === detailsType.length - 1;

    return (
      <View style={tw``}>
        <TouchableOpacity
          style={[
            tw`h-7`,
            {paddingHorizontal: 10},
            isLastItem && {marginRight: 10}, // Add marginRight only if it's the last item
          ]}
          onPress={() => setType(item.name)}>
          <Text style={tw`text-[#fff] text-[18px] font-400 self-center`}>
            {t(item.name)}
          </Text>
          {type === item.name && (
            <View style={tw`border-b-2 border-[#fff] w-full self-center`} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="" />
      <ScrollView>
        <View style={[tw`  mt-2 mx-5`]}>
          <View style={tw`flex-row justify-between`}>
            <Image
              source={{uri: detailData?.league?.image_path}}
              style={tw`w-6 h-6 mt-2 ml-3`}
            />
            <Text
              style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5`}>
              {moment(detailData?.starting_at).format('MMMM Do YYYY')}
            </Text>

            <Text
              style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
              {detailData?.length}"
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
        {/* <View style={tw`flex-row self-center mt-5`}>
          <Text
            style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-31`}>
            R. Mahrez 57’ (Pen)
          </Text>
          <Image
            source={require('../../../assets/icons/football.png')}
            style={[tw`w-5 h-5 mt-2 mx-5`, {resizeMode: 'contain'}]}
          />

          <Text
            style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-30`}>
            R. Mahrez 57’ (Pen)
          </Text>
        </View>
        <View style={tw`flex-row self-center mt-2`}>
          <Text
            style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-35`}></Text>
          <Image
            source={require('../../../assets/icons/red-card.png')}
            style={[tw`w-5 h-5 mt-2 mx-5`, {resizeMode: 'contain'}]}
          />

          <Text
            style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-35`}>
            Gabriel Magalhaes 59’
          </Text>
        </View> */}
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
          {type === 'Summary' && <Summary />}
          {type === 'Statistics' && <Statistics fixtureId={fixtureId} />}
          {type === 'Standings' && <Standings />}
          {type === 'Players' && <Players fixtureId={fixtureId} />}
          {type === 'Commentary' && <Commentary />}
        </Suspense>
      </ScrollView>
    </View>
  );
};

export default HighlightDetail;

const styles = StyleSheet.create({});
