import {
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getFixturesByIdLineUps} from '../../redux/fixturesSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../header/header';

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

  // Separate players into starters and substitutes
  const starters = teamPlayers?.filter(
    player =>
      player?.formation_position >= 1 && player?.formation_position <= 11,
  );
  const substitutes = teamPlayers?.filter(
    player =>
      player?.formation_position === null || player?.formation_position > 11,
  );

  const categoryImages = {
    Goalkeeper: require('../../assets/icons/football-goalkeeper-catching-the-ball.png'),
    Defenders: require('../../assets/icons/football-player-blocking-another-player.png'),
    Midfielders: require('../../assets/icons/football-player-kicking-ball.png'),
    Strikers: require('../../assets/icons/football-player-setting-ball.png'),
  };

  // Prepare data for FlatList
  const renderData = [
    ...Object.keys(playerCategories).map(category => ({
      type: 'category',
      category,
      players: starters?.filter(player =>
        playerCategories[category].includes(player?.formation_position),
      ),
    })),
    {
      type: 'bench',
      players: substitutes,
    },
  ].filter(section => section.players?.length > 0); // Filter out empty sections

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <FlatList
        ListHeaderComponent={
          <ImageBackground
            source={require('../../assets/player-bg.png')}
            style={[tw`w-full h-40`, {resizeMode: 'contain'}]}>
            <Header />
            <View style={tw`flex-row`}>
              <Image
                source={{uri: teamImage}}
                style={[tw`w-17 h-17 mx-3`, {resizeMode: 'contain'}]}
              />
              <Text
                style={tw`text-[#fff] text-[25px] font-401 leading-normal self-center mt-2`}>
                {teamName}
              </Text>
            </View>
          </ImageBackground>
        }
        data={renderData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          if (item.type === 'category') {
            return (
              <View style={tw`mx-5`}>
                <View style={tw`flex-row `}>
                  <Image
                    source={categoryImages[item.category]}
                    style={[
                      tw`w-6 h-6 ml-1 mr-3 mt-3.5`,
                      {resizeMode: 'contain'},
                    ]}
                  />
                  <Text
                    style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-4`}>
                    {item.category}
                  </Text>
                </View>
                {item.players.map(player => {
                  console.log('players', player);
                  return (
                    <View
                      key={player.id}
                      style={tw`flex-row justify-between mt-2 bg-[#303649] rounded-md p-2.5`}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PlayerInfo', {
                            playerId: player?.player?.id,
                            teamImage: teamImage,
                            teamName: teamName,
                          })
                        }
                        style={tw`flex-row items-center`}>
                        <View
                          style={tw`bg-[#fff] rounded-lg mr-3 overflow-hidden`}>
                          <Image
                            source={{uri: player?.player?.image_path}}
                            style={tw`w-10 h-10`}
                          />
                        </View>
                        <Text
                          style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
                          {player?.player?.display_name}
                        </Text>
                      </TouchableOpacity>
                      <Image
                        source={require('../../assets/american-football.png')}
                        style={[
                          tw`w-6 h-6 self-center`,
                          {resizeMode: 'contain'},
                        ]}
                      />
                    </View>
                  );
                })}
              </View>
            );
          } else if (item.type === 'bench') {
            return (
              <View style={tw`mx-5`}>
                <Text style={tw`text-[#fff] text-[18px] font-bold mt-5`}>
                  Bench
                </Text>
                <View
                  style={[
                    tw`p-3 rounded-md mt-2`,
                    {backgroundColor: '#303649'},
                  ]}>
                  {item.players.map(player => (
                    <View
                      key={player.id}
                      style={tw`flex-row items-center mt-4 justify-between`}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PlayerInfo', {
                            playerId: player?.player?.id,
                          })
                        }
                        style={tw`flex-row items-center`}>
                        <View
                          style={tw`bg-[#fff] rounded-lg mr-3 overflow-hidden p-1`}>
                          <Image
                            source={{uri: player?.player?.image_path}}
                            style={tw`w-8 h-8 rounded-full`}
                          />
                        </View>
                        <Text
                          style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
                          {player?.player?.display_name}
                        </Text>
                      </TouchableOpacity>
                      <Image
                        source={require('../../assets/american-football.png')}
                        style={[
                          tw`w-6 h-6 self-center`,
                          {resizeMode: 'contain'},
                        ]}
                      />
                    </View>
                  ))}
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default Players;
