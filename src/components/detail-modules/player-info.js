import {
  FlatList,
  Image,
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

const PlayerInfo = () => {
  const route = useRoute();
  const playerId = route?.params?.playerId;
  const data = useSelector(state => state?.player?.playerData);
  const seasons = useSelector(state => state?.player?.allSeasons);
  const dispatch = useDispatch();

  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

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
    dispatch(getPlayersById(playerId));
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

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="" />
      <ScrollView>
        <Image
          source={{uri: data?.image_path}}
          style={tw`w-15 h-15 mr-2 rounded-full self-center`}
        />
        <Text
          style={tw`text-[#fff] text-[24px] self-center font-401 leading-normal mt-2`}>
          {data?.display_name}
        </Text>
        <Text
          style={tw`text-[#a9a9a9] text-[20px] self-center font-401 leading-normal`}>
          {data?.position?.name}
        </Text>

        <View style={tw`bg-[#a9a9a9] w-90 mt-3 mx-5 rounded-md py-5`}>
          <Image
            source={{uri: data?.country?.image_path}}
            style={tw`w-15 h-15 mr-2 rounded-full self-center `}
          />
          <Text
            style={tw`text-[#fff] text-[24px] font-401 self-center leading-normal mt-2`}>
            {data?.country?.official_name}
          </Text>

          <View style={tw`flex-row justify-between mx-5`}>
            <View>
              <Text
                style={tw`text-[#000] text-[20px] font-401 leading-normal mt-2`}>
                Date of Birth
              </Text>
              <Text
                style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center`}>
                {data?.date_of_birth}
              </Text>
            </View>

            <View>
              <Text
                style={tw`text-[#000] text-[20px] font-401 leading-normal mt-2`}>
                Jersey Number
              </Text>
              <Text
                style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center`}>
                {data?.statistics?.[0]?.jersey_number}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between mx-5`}>
            <View>
              <Text
                style={tw`text-[#000] text-[20px] font-401 leading-normal mt-2`}>
                Height
              </Text>
              <Text
                style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center`}>
                {data?.height} cm
              </Text>
            </View>

            <View>
              <Text
                style={tw`text-[#000] text-[20px] font-401 leading-normal mt-2`}>
                Gender
              </Text>
              <Text
                style={[
                  tw`text-[#fff] text-[16px] font-401 leading-normal  self-center`,
                  {textTransform: 'capitalize'},
                ]}>
                {data?.gender}
              </Text>
            </View>
          </View>
        </View>

        {/* Displaying Seasons */}
        <View style={tw`bg-[#a9a9a9] w-90 mt-3 mx-5 rounded-md py-5`}>
          <Text style={tw`text-[#000] text-[20px] font-401 leading-normal`}>
            Seasons
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={tw`mt-3`}>
            {Object.values(seasons).map((season, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  tw`bg-red-300 mx-2 p-2 rounded-lg`,
                  selectedSeasonId === season.id ? tw`bg-red-500` : null,
                ]}
                onPress={() => handleSeasonClick(season.id)}>
                <Text style={tw`text-[#fff] text-[16px]`}>
                  {season.name || 'No name available'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Displaying filtered statistics based on the selected season */}
        <View style={tw`bg-[#a9a9a9] w-90 mt-3 mx-5 rounded-md py-5`}>
          <Text
            style={tw`text-[#000] text-[20px] font-401 leading-normal mt-2`}>
            Statistics
          </Text>
          {filteredStats.length > 0 ? (
            filteredStats.map((stat, index) => (
              <View key={index} style={tw`mt-2`}>
                <Text style={tw`text-[#000] text-[16px] font-400`}>
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
