import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getLineups} from '../../redux/standingSlice';
import {getPlayersById} from '../../redux/playerSlice';
import Modal from 'react-native-modal';

const LineUps = ({fixtureId}) => {
  const dispatch = useDispatch();
  const formation = useSelector(state => state?.standing?.lineUpFormations);
  const [selectedTeam, setSelectedTeam] = useState('home');
  const [playerDetails, setPlayerDetails] = useState({});
  const requestCache = React.useRef({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    dispatch(getLineups(fixtureId));
  }, [dispatch, fixtureId]);

  const getPlayerDetails = async playerId => {
    if (playerDetails[playerId]) {
      // If data is already fetched, return it
      return playerDetails[playerId];
    }

    if (requestCache.current[playerId]) {
      // If a request is already ongoing, return the same promise
      return requestCache.current[playerId];
    }

    // Make an API call and store the promise in the cache
    const fetchPromise = dispatch(
      getPlayersById({
        playerId,
        includeParams: 'statistics.details.type;country;position',
      }),
    )
      .unwrap()
      .then(playerData => {
        // Cache the resolved data
        setPlayerDetails(prev => ({...prev, [playerId]: playerData}));
        delete requestCache.current[playerId]; // Clean up cache after resolution
        return playerData;
      })
      .catch(error => {
        console.error('Error fetching player details:', error);
        delete requestCache.current[playerId]; // Clean up on error
        throw error;
      });

    requestCache.current[playerId] = fetchPromise; // Store promise in cache
    return fetchPromise;
  };

  const getTeamData = () => {
    if (!formation || !formation?.formations || !formation?.participants) {
      return {homeTeam: null, awayTeam: null};
    }

    const homeFormation = formation?.formations?.find(
      f => f.location === 'home',
    );
    const awayFormation = formation?.formations?.find(
      f => f.location === 'away',
    );

    const homeParticipant = formation?.participants?.find(
      p => p?.id === homeFormation?.participant_id,
    );
    const awayParticipant = formation?.participants?.find(
      p => p?.id === awayFormation?.participant_id,
    );

    const homeTeam = {
      formation: homeFormation?.formation,
      image: homeParticipant?.image_path,
      name: homeParticipant?.name,
      lineups: formation?.lineups?.filter(
        l => l.team_id === homeParticipant?.id,
      ),
    };

    const awayTeam = {
      formation: awayFormation?.formation,
      image: awayParticipant?.image_path,
      name: awayParticipant?.name,
      lineups: formation?.lineups?.filter(
        l => l.team_id === awayParticipant?.id,
      ),
    };

    return {homeTeam, awayTeam};
  };

  const parseFormation = formationString => {
    return formationString.split('-')?.map(num => parseInt(num, 10));
  };

  const getPositionStyle = (formationPosition, formation) => {
    const rows = parseFormation(formation);
    let currentRow = 0;
    let playerIndex = 0;

    // Determine the row and position within the row
    for (let i = rows.length - 1; i >= 0; i--) {
      if (formationPosition <= playerIndex + rows[i]) {
        currentRow = i;
        playerIndex = formationPosition - playerIndex - 1;
        break;
      }
      playerIndex += rows[i];
    }

    // Vertical positioning
    let top;
    if (rows[currentRow] === 1) {
      // Position goalkeeper at the top center
      top = '5%'; // Adjust as needed to place the goalkeeper at the top
    } else {
      // Base vertical positioning for other rows
      const baseTop = 70; // Default top for defenders
      const rowSpacing = 20; // Vertical spacing between rows
      top = `${baseTop - currentRow * rowSpacing}%`;
    }

    // Horizontal positioning
    const playersInRow = rows[currentRow];
    let left;
    if (playersInRow === 1) {
      // Center single player (goalkeeper)
      left = '45%';
    } else {
      // Evenly distribute players in the row
      const totalWidth = 65; // Width across which players are spread
      const leftMargin = 13; // Margin from the left edge
      const spacing = totalWidth / (playersInRow - 1);
      left = `${leftMargin + playerIndex * spacing}%`;
    }

    return {top, left};
  };

  useEffect(() => {
    const fetchDetailsForPlayers = async () => {
      const currentTeam = selectedTeam === 'home' ? homeTeam : awayTeam;

      if (!currentTeam?.lineups?.length) return;

      const playerIdsToFetch = currentTeam.lineups
        .filter(player => !playerDetails[player?.player_id]) // Only fetch if not cached
        .map(player => player.player_id);

      // Fetch details for all players
      try {
        await Promise.all(
          playerIdsToFetch.map(playerId => getPlayerDetails(playerId)),
        );
      } catch (error) {
        console.error('Error fetching details for players:', error);
      }
    };

    if (formation?.lineups?.length > 0) {
      fetchDetailsForPlayers();
    }
  }, [selectedTeam, homeTeam, awayTeam, formation]); // No playerDetails dependency here

  const {homeTeam, awayTeam} = getTeamData();

  const renderPlayers = lineups => {
    return lineups.map(player => {
      const playerData = playerDetails[player?.player_id]; // Use cached data

      return (
        <View
          key={player?.player_id}
          style={[
            tw`absolute`,
            getPositionStyle(
              player.formation_position,
              selectedTeam === 'home'
                ? homeTeam?.formation
                : awayTeam?.formation,
            ),
          ]}>
          {playerData && (
            <TouchableOpacity
              onPress={() => {
                setSelectedPlayer(playerData?.data); // Pass player details to the modal
                setIsModalVisible(true); // Open the modal
              }}>
              <View style={tw`bg-[#fff] rounded-full w-9 p-1`}>
                <Image
                  source={{uri: playerData?.data?.image_path}}
                  style={[tw`w-7 h-7 rounded-full`, {resizeMode: 'cover'}]}
                />
              </View>
              <View
                style={tw`bg-red-100 absolute right-5 top-6 rounded-full w-3`}>
                <Text
                  style={tw`text-[#220000] text-[10px] font-401 text-center`}>
                  {playerData?.data?.statistics?.[0]?.jersey_number}
                </Text>
              </View>

              <Text
                style={tw`text-[#fff] text-[12px] font-401 text-center mt-1 w-17 ml--3`}>
                {playerData?.data?.display_name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  const currentTeam = selectedTeam === 'home' ? homeTeam : awayTeam;

  return (
    <View style={tw``}>
      {formation?.lineups?.length > 0 ? (
        <>
          <View style={tw`flex-row justify-center my-3`}>
            <TouchableOpacity
              onPress={() => setSelectedTeam('home')}
              style={[
                tw`px-4 py-2 rounded-md`,
                selectedTeam === 'home' ? tw`bg-blue-500` : tw`bg-[#05102E]`,
              ]}>
              <Text style={tw`text-white text-[18px] font-401`}>
                HomeTeam: {homeTeam?.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTeam('away')}
              style={[
                tw`px-4 py-2 rounded-md ml-3`,
                selectedTeam === 'away' ? tw`bg-blue-500` : tw`bg-[#05102E]`,
              ]}>
              <Text style={tw`text-white text-[16px] font-401`}>
                AwayTeam: {awayTeam?.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row mt-2 mx-2 justify-between`}>
            <View style={tw`flex-row`}>
              <Image
                source={{uri: currentTeam?.image}}
                style={[tw`w-7 h-7 ml-3`, {resizeMode: 'contain'}]}
              />
              <Text
                style={tw`text-[#fff] text-[20px] font-401 leading-normal ml-5`}>
                {currentTeam?.name}
              </Text>
            </View>
            <View>
              <Text
                style={tw`text-[#fff] text-[20px] font-401 leading-normal mr-3`}>
                {currentTeam?.formation}
              </Text>
            </View>
          </View>
          <ImageBackground
            source={require('../../assets/field.png')}
            style={[tw` w-100 h-100`, {resizeMode: 'contain'}]}>
            {currentTeam && renderPlayers(currentTeam?.lineups)}
          </ImageBackground>
        </>
      ) : (
        <Text
          style={tw`text-[#fff] text-[20px] font-401 self-center leading-normal mr-3`}>
          No Data Found!
        </Text>
      )}

      {/* <ImageBackground
        source={require('../../assets/field.png')}
        style={[tw`w-full h-70`]}>
        <Text
          style={tw`text-[#fff] text-[20px] font-401 self-center leading-normal mr-3`}>
          No Data Found!
        </Text>
      </ImageBackground> */}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={tw`m-0 justify-end`}>
        <View style={tw`bg-white p-5 rounded-t-lg`}>
          {selectedPlayer ? (
            <>
              <View style={tw`flex-row items-center mb-3`}>
                <Image
                  source={{uri: selectedPlayer.image_path}}
                  style={tw`w-16 h-16 rounded-full`}
                />
                <View
                  style={tw`bg-[#303649] rounded-full px-1 absolute left-11 top-10.5 h-5.4`}>
                  <Text
                    style={tw`text-[#fff] text-[14px] font-400 leading-normal self-center`}>
                    {selectedPlayer.statistics?.[0]?.jersey_number || 'N/A'}
                  </Text>
                </View>
                <View style={tw`ml-4`}>
                  <Text style={tw`text-lg font-bold text-black`}>
                    {selectedPlayer.display_name}
                  </Text>
                  <Text style={tw`text-sm text-gray-500`}>
                    Position: {selectedPlayer.position?.name || 'N/A'}
                  </Text>
                  <Text style={tw`text-sm text-gray-500`}>
                    Country: {selectedPlayer.country?.name || 'N/A'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={tw`bg-blue-500 p-2 rounded mt-4`}>
                <Text style={tw`text-white text-center`}>Close</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={tw`text-black`}>Loading...</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default LineUps;
