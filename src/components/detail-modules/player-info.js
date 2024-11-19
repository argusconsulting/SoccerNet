import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import Header from '../header/header';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayersById, getSeasonsById} from '../../redux/playerSlice';
import Entypo from 'react-native-vector-icons/Entypo';

const PlayerInfo = () => {
  const route = useRoute();
  const playerId = route?.params?.playerId;
  const teamImage = route?.params?.teamImage;
  const teamName = route?.params?.teamName;
  const data = useSelector(state => state?.player?.playerData);
  const seasons = useSelector(state => state?.player?.allSeasons);
  const dispatch = useDispatch();

  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

  console.log('data', data);

  const targetStatNames = [
    'Shots Total',
    'Penalties',
    'Fouls',
    'Substitutions',
    'Goals Conceded',
    'Clearances',
    'Rating',
    'Minutes Played',
    'Appearances',
    'Saves',
    'Bench',
  ];

  // Filter statistics based on the selected season
  const filteredStats =
    data?.statistics
      ?.filter(
        stat =>
          stat.season_id === selectedSeasonId &&
          stat.has_values &&
          stat.details.length > 0,
      )
      ?.flatMap(stat =>
        stat.details.filter(detail =>
          targetStatNames.includes(detail?.type?.name),
        ),
      ) || [];

  useEffect(() => {
    dispatch(
      getPlayersById({
        playerId,
        includeParams: 'statistics.details.type;country;position',
      }),
    );
  }, [playerId, dispatch]);

  useEffect(() => {
    if (data?.statistics) {
      const uniqueSeasonIds = [
        ...new Set(data.statistics.map(stat => stat.season_id)),
      ];

      // Fetch season data for each unique season ID
      uniqueSeasonIds.forEach(season_id => {
        dispatch(getSeasonsById(season_id));
      });

      // Set initial selected season to the first one in the list
      if (uniqueSeasonIds.length > 0) {
        setSelectedSeasonId(uniqueSeasonIds[0]);
      }
    }
  }, [data, dispatch]);

  const handleSeasonClick = seasonId => {
    setSelectedSeasonId(seasonId);
  };

  const categoryImages = {
    Goalkeeper: require('../../assets/icons/football-goalkeeper-catching-the-ball.png'),
    Defender: require('../../assets/icons/football-player-blocking-another-player.png'),
    Midfielder: require('../../assets/icons/football-player-kicking-ball.png'),
    Striker: require('../../assets/icons/football-player-setting-ball.png'),
  };
  const positionName = data?.position?.name;

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="" />
      <ScrollView>
        {/* {data?.statistics?.[0]?.jersey_number} */}
        <ImageBackground
          source={require('../../assets/Player-profile.png')}
          style={tw`w-full h-100 justify-center items-center`} // Adjust height and width as needed
          imageStyle={{resizeMode: 'contain'}} // Use "contain" or "stretch" as per your requirement
        >
          <ImageBackground
            source={require('../../assets/jersey-bg.png')}
            style={[tw`w-7 h-14 absolute top-1`, {resizeMode: 'contain'}]} // Profile image size
          >
            <Text
              style={tw`text-[#fff] text-[22px] self-center mt-4 font-401 leading-normal`}>
              {data?.statistics?.[0]?.jersey_number}
            </Text>
          </ImageBackground>
          <Image
            source={{uri: data?.image_path}}
            style={tw`w-32 h-32 rounded-full mb-20 absolute top-23`} // Profile image size
          />
          <Text
            style={tw`text-[#fff] text-[22px] self-center mt-70 font-402 leading-normal`}>
            {data?.display_name}
          </Text>
          <View style={tw`flex-row border-b-[#fff] border-b-[0.3px] mt-3 pb-1`}>
            {positionName && categoryImages[positionName] && (
              <Image
                source={categoryImages[positionName]}
                style={tw`w-6 h-6 mr-2`} // Adjust image size as per your requirement
              />
            )}
            <Text
              style={tw`text-[#fff] text-[16px] self-center font-401 leading-normal mr-5`}>
              {positionName}
            </Text>
            <Entypo
              name={'man'}
              size={20}
              color={'#0096FF'}
              style={tw`self-center`}
            />
            <Text
              style={[
                tw`text-[#fff] text-[16px] self-center font-401 leading-normal`,
                {textTransform: 'capitalize'},
              ]}>
              {data?.gender}
            </Text>
          </View>
          <View style={tw`flex-row  mt-3`}>
            <Image
              source={{uri: teamImage}}
              style={tw`w-7 h-7 mr-3 rounded-full `}
            />
            <Text
              style={tw`text-[#fff] text-[22px] self-center font-402 leading-normal`}>
              {teamName}
            </Text>
          </View>
        </ImageBackground>

        <View style={tw`bg-[#303649] w-90 mt-3 mx-5 rounded-md py-5`}>
          <View style={tw`flex-row justify-between mx-5`}>
            <View style={tw`flex-row `}>
              <Entypo
                name={'calendar'}
                size={20}
                color={'#fff'}
                style={tw`self-center mr-2`}
              />
              <Text
                style={tw`text-[#fff] text-[20px] font-401 leading-normal mt-1`}>
                Date of Birth
              </Text>
            </View>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal self-center mt-1`}>
              {data?.date_of_birth}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mx-5`}>
            <View style={tw`flex-row mt-2 `}>
              <Image
                source={require('../../assets/icons/measuring-tape.png')}
                style={tw`w-5 h-5 mr-3 mt-0.5 `}
              />
              <Text
                style={tw`text-[#fff] text-[20px] font-401 leading-normal `}>
                Height
              </Text>
            </View>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal self-center mt-2`}>
              {data?.height} CM
            </Text>
          </View>
        </View>

        {/* Displaying filtered statistics based on the selected season */}
        <View style={tw`bg-[#303649] w-90 mt-3 mx-5 rounded-md py-5`}>
          <View style={tw`flex-row  mx-5`}>
            <Image
              source={require('../../assets/icons/season.png')}
              style={tw`w-5 h-5 mr-3 mt-0.5 `}
            />
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal `}>
              Seasons
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={tw`mt-3`}>
            {Object.values(seasons).map((season, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  tw`bg-red-300 ml-5 p-2 rounded-lg mb-5`,
                  selectedSeasonId === season.id
                    ? tw`bg-[#435AE5]`
                    : tw`bg-[#05102E]`,
                ]}
                onPress={() => handleSeasonClick(season.id)}>
                <Text style={tw`text-[#fff] text-[16px] `}>
                  {season.name || 'No name available'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {filteredStats.length > 0 ? (
            filteredStats.map((stat, index) => (
              <View key={index} style={tw`mt-2 mx-5`}>
                <Text style={tw`text-[#fff] text-[16px] font-400`}>
                  {stat.type.name}:{' '}
                  {stat.value.total ?? stat.value.average ?? 'N/A'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={tw`text-[#000] text-[16px] font-400 mt-5 self-center`}>
              No statistics available for this season
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({});
