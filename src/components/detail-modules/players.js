import {
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getFixturesByIdLineUps} from '../../redux/fixturesSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../header/header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const playerCategories = {
  Goalkeeper: [1],
  Defenders: [2, 3, 4, 5],
  Midfielders: [6, 7, 8],
  Strikers: [9, 10, 11],
};

const Players = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const fixtureId = route?.params?.fixtureId;
  const teamId = route?.params?.teamId;
  const teamName = route?.params?.teamName;
  const teamImage = route?.params?.teamImage;
  const dispatch = useDispatch();
  const data = useSelector(state => state?.fixtures?.fixturesByIdLineUps);

  useEffect(() => {
    dispatch(getFixturesByIdLineUps(fixtureId));
  }, [dispatch, fixtureId]);

  // Filter out the players of the selected team
  const teamPlayers = data?.lineups?.filter(
    player => player?.team_id === teamId,
  );

  // Separate players into starters and substitutes based on `formation_position`
  const starters = teamPlayers?.filter(
    player =>
      player?.formation_position >= 1 && player?.formation_position <= 11,
  );
  const substitutes = teamPlayers?.filter(
    player =>
      player?.formation_position === null || player?.formation_position > 11,
  );

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header />
      <ScrollView>
        <View style={tw`px-5`}>
          <Image
            source={{uri: teamImage}}
            style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[24px] font-401 leading-normal self-center mt-2`}>
            {teamName}
          </Text>

          {Object.keys(playerCategories).map(category => {
            const playersInCategory = starters?.filter(player =>
              playerCategories[category].includes(player?.formation_position),
            );

            if (playersInCategory?.length > 0) {
              return (
                <View key={category}>
                  <Text
                    style={tw`text-[#fff] text-[20px] font-401 leading-normal mt-3`}>
                    {category}:
                  </Text>
                  <FlatList
                    data={playersInCategory}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={tw`flex-row justify-between mt-2 bg-[#a9a9a9] rounded-md py-1`}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('PlayerInfo', {
                                playerId: item?.player?.id,
                              })
                            }
                            style={tw`flex-row items-center`}>
                            <Image
                              source={{uri: item?.player?.image_path}}
                              style={tw`w-8 h-8 mr-2 rounded-full`}
                            />
                            <Text
                              style={tw`text-[#000] text-[18px] font-401 leading-normal`}>
                              {item?.player?.display_name}
                            </Text>
                          </TouchableOpacity>
                          <FontAwesome5
                            name={'tshirt'}
                            size={20}
                            color={'#fff'}
                            style={tw`mr-3 self-center`}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              );
            } else {
              return null;
            }
          })}

          {/* Display Substitutes */}
          <Text style={tw`text-[#fff] text-[18px] font-bold mt-5`}>Bench</Text>
          {substitutes?.length > 0 && (
            <View
              style={[tw`p-3 rounded-md mt-2`, {backgroundColor: '#a9a9a9'}]}>
              <FlatList
                data={substitutes}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={tw`flex-row items-center mt-4 border-b-[#090909] border-b-[0.7px]`}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PlayerInfo', {
                          playerId: item?.player?.id,
                        })
                      }
                      style={tw`flex-row items-center`}>
                      <Image
                        source={{uri: item?.player?.image_path}}
                        style={tw`w-8 h-8 mr-2 mb-2 rounded-full`}
                      />
                      <Text
                        style={tw`text-[#000] text-[18px] font-400 leading-normal`}>
                        {item?.player?.display_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Players;
