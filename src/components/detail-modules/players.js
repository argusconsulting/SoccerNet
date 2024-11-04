import {Image, ImageBackground, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getLineups} from '../../redux/standingSlice';

const Players = ({fixtureId}) => {
  const dispatch = useDispatch();
  const formation = useSelector(state => state?.standing?.lineUpFormations);

  useEffect(() => {
    dispatch(getLineups(fixtureId));
  }, [dispatch, fixtureId]);

  const getTeamData = () => {
    if (!formation || !formation?.formations || !formation?.participants) {
      return {homeTeam: null};
    }

    const homeFormation = formation?.formations?.find(
      f => f.location === 'home',
    );
    const homeParticipant = formation?.participants?.find(
      p => p?.id === homeFormation?.participant_id,
    );

    const homeTeam = {
      formation: homeFormation?.formation,
      image: homeParticipant?.image_path,
      name: homeParticipant?.name,
      lineups: formation?.lineups?.filter(
        l => l.team_id === homeParticipant?.id,
      ),
    };

    return {homeTeam};
  };

  const {homeTeam} = getTeamData();

  const parseFormation = formationString => {
    return formationString.split('-').map(num => parseInt(num, 10));
  };

  // Adjust position style to render from bottom to top
  const getPositionStyle = (formationPosition, formation) => {
    const rows = parseFormation(formation);
    let currentRow = 0;
    let playerIndex = 0;

    // Find the row and player index in that row for bottom-to-top rendering
    for (let i = rows.length - 1; i >= 0; i--) {
      if (formationPosition <= playerIndex + rows[i]) {
        currentRow = i;
        playerIndex = formationPosition - playerIndex - 1;
        break;
      }
      playerIndex += rows[i];
    }

    // Calculate top positioning
    const top = `${70 - currentRow * 20}%`; // Start from 70% for the goalkeeper to move upwards

    // Calculate left positioning
    let left;
    if (formationPosition === 1) {
      // Place the goalkeeper in the center
      left = '45%'; // Center position
    } else {
      // Adjust horizontal spacing for other players
      left = `${5 + (playerIndex * 80) / (rows[currentRow] - 1)}%`; // Adjust horizontal spacing
    }

    return {top, left};
  };

  const renderPlayers = lineups => {
    return lineups.map(player => (
      <View
        key={player.id}
        style={[
          tw`absolute`,
          getPositionStyle(player.formation_position, homeTeam?.formation),
        ]}>
        <View
          style={tw`bg-red-600 w-8 h-8 rounded-full justify-center items-center border-[#fff] border-[0.8px]`}>
          <Text style={tw`text-[#fff] text-[12px] font-401`}>
            {player.jersey_number}
          </Text>
        </View>
        <Text
          style={tw`text-[#fff] text-[12px] font-401 text-center mt-1 w-20 ml--5`}>
          {player.player_name}
        </Text>
      </View>
    ));
  };

  return (
    <View style={tw`m-5`}>
      <ImageBackground
        source={require('../../assets/footballField.png')}
        style={tw`h-200 w-full`}>
        <View style={tw`flex-row mt-2 mx-2 justify-between`}>
          <View style={tw`flex-row`}>
            <Image
              source={{uri: homeTeam?.image}}
              style={[tw`w-7 h-7 ml-3`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal ml-5`}>
              {homeTeam?.name}
            </Text>
          </View>
          <View>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal mr-3`}>
              {homeTeam?.formation}
            </Text>
          </View>
        </View>
        {homeTeam && renderPlayers(homeTeam.lineups)}
      </ImageBackground>
    </View>
  );
};

export default Players;
