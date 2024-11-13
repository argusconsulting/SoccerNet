import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import Header from '../header/header';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayersById, getSeasonsById} from '../../redux/playerSlice';

const PlayerInfo = () => {
  const route = useRoute();
  const playerId = route?.params?.playerId;
  const data = useSelector(state => state?.player?.playerData);
  const dispatch = useDispatch();

  console.log('playerId', playerId);
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
  ];

  // Filter the `details` array to include only the specified statistics
  const filteredStats =
    data?.statistics
      ?.flatMap(stat => stat.details)
      .filter(detail => targetStatNames.includes(detail?.type?.name)) || [];

  useEffect(() => {
    dispatch(getPlayersById(playerId));
  }, []);

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
          style={tw`text-[#a9a9a9] text-[20px] self-center font-401 leading-normal `}>
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

        <View style={tw`bg-[#a9a9a9] w-90 mt-3 mx-5 rounded-md py-5`}>
          <Text
            style={tw`text-[#000] text-[20px] font-401 leading-normal mt-2`}>
            Statistics
          </Text>
          {filteredStats.map((stat, index) => (
            <View key={index} style={tw`mt-2`}>
              <Text style={tw`text-[#000] text-[16px] font-400`}>
                {stat.type.name}:{' '}
                {stat.value.total ?? stat.value.average ?? 'N/A'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({});
