import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import Header from '../../../components/header/header';
import tw from '../../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  const navigation = useNavigation()
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
       <ImageBackground
          source={require('../../../assets/detail-bg.png')}
          style={[tw`w-full h-50`, {resizeMode: 'contain'}]}>
      <Header name="" />

      <View style={[tw` px-5 pb-10  mt--5`]}>
        <View style={tw`flex-row justify-between`}>
          <Image
            source={{uri: detailData?.league?.image_path}}
            style={tw`w-5 h-5 mt-2 ml-3`}
          />
          <Text
            style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center mt-1.5`}>
            {moment(detailData?.starting_at).format('MMMM Do YYYY')}
          </Text>

          <Text
            style={tw`text-red-500 text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
            Live
          </Text>
        </View>

        <View style={tw`flex-row justify-between mx-12 mt-7`}>
          <View>
          <TouchableOpacity
                  style={[tw`self-center justify-center items-center`]} // Wrapper styling for positioning
                  onPress={() =>
                    navigation.navigate('Players', {
                      fixtureId: fixtureId,
                      teamId: homeTeam.id,
                      teamName: homeTeam?.name,
                      teamImage: homeTeam?.image_path,
                    })
                  }>
                  <View style={[tw`relative w-14 h-14`]}>
                    {/* Shadowed circle */}
                    <View
                      style={[
                        tw`absolute inset-0`, // Ensures it fills the parent container
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent shadow effect
                          borderRadius: 999, // Circular container
                          shadowColor: '#fff',
                          shadowOffset: {width: 0, height: 3},
                          shadowOpacity: 0.1,
                          shadowRadius: 6,
                          elevation: 12, // For Android shadow
                        },
                      ]}
                    />
                    {/* Image centered inside the shadowed circle */}
                    <Image
                      source={{uri: homeTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center mt-2`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
                  </View>
                </TouchableOpacity>

            <Text
              style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5 self-center `}>
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
          <TouchableOpacity
                  style={[tw`self-center justify-center items-center`]}
                  onPress={() =>
                    navigation.navigate('Players', {
                      fixtureId: fixtureId,
                      teamId: awayTeam?.id,
                      teamName: awayTeam?.name,
                      teamImage: awayTeam?.image_path,
                    })
                  }>
                  <View style={[tw`relative w-14 h-14`]}>
                    {/* Shadowed circle */}
                    <View
                      style={[
                        tw`absolute inset-0`, // Ensures it fills the parent container
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent shadow effect
                          borderRadius: 999, // Circular container
                          shadowColor: '#fff',
                          shadowOffset: {width: 0, height: 3},
                          shadowOpacity: 0.1,
                          shadowRadius: 6,
                          elevation: 12, // For Android shadow
                        },
                      ]}
                    />
                    <Image
                      source={{uri: awayTeam?.image_path}}
                      style={[
                        tw`w-10 h-10 self-center mt-2`, // Image size and centering
                        {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
                      ]}
                    />
                  </View>
                </TouchableOpacity>
            <Text
              style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5 self-center`}>
              {awayTeam?.name}
            </Text>
          </View>
        </View>
      </View>
      </ImageBackground>

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
