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

const Players = ({fixtureId}) => {
  const dispatch = useDispatch();
  const formation = useSelector(state => state?.standing?.lineUpFormations);
  const [selectedTeam, setSelectedTeam] = useState('home'); // State to manage selected team

  useEffect(() => {
    dispatch(getLineups(fixtureId));
  }, [dispatch, fixtureId]);

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

  const {homeTeam, awayTeam} = getTeamData();

  const parseFormation = formationString => {
    return formationString.split('-').map(num => parseInt(num, 10));
  };

  const getPositionStyle = (formationPosition, formation) => {
    const rows = parseFormation(formation);
    const totalPlayers = rows.reduce((acc, row) => acc + row, 0);
    let currentRow = 0;
    let playerIndex = 0;

    for (let i = rows.length - 1; i >= 0; i--) {
      if (formationPosition <= playerIndex + rows[i]) {
        currentRow = i;
        playerIndex = formationPosition - playerIndex - 1;
        break;
      }
      playerIndex += rows[i];
    }

    const top = `${70 - currentRow * 20}%`;
    let left;
    if (formationPosition === 1) {
      left = '45%';
    } else {
      left = `${5 + (playerIndex * 80) / (rows[currentRow] - 1)}%`;
    }

    return {top, left};
  };

  // const getPositionStyle = (formationPosition, formation) => {
  //   const rows = parseFormation(formation);

  //   // Check if the formation has exactly 3 segments (e.g., "5-3-2")
  //   const isThreeSegmentFormation = rows.length === 3;

  //   if (isThreeSegmentFormation && formationPosition === 1) {
  //     // Center the goalkeeper if there are exactly 3 segments
  //     return {top: '80%', left: '45%'};
  //   }

  //   // Default positioning logic for formations with 4 segments or non-goalkeeper players in 3-segment formations
  //   let currentRow = 0;
  //   let playerIndex = formationPosition - 1;

  //   for (let i = 0; i < rows.length; i++) {
  //     if (playerIndex < rows[i]) {
  //       currentRow = i;
  //       break;
  //     }
  //     playerIndex -= rows[i];
  //   }

  //   // Calculate top and left positioning based on row and player index
  //   const top = `${70 - currentRow * 20}%`;
  //   const left =
  //     rows[currentRow] === 1
  //       ? '45%'
  //       : `${5 + (playerIndex * 80) / (rows[currentRow] - 1)}%`;

  //   return {top, left};
  // };

  const renderPlayers = lineups => {
    return lineups.map(player => (
      <View
        key={player.id}
        style={[
          tw`absolute`,
          getPositionStyle(
            player.formation_position,
            selectedTeam === 'home' ? homeTeam?.formation : awayTeam?.formation,
          ),
        ]}>
        <View
          style={tw`bg-red-600 w-8 h-8 rounded-full justify-center items-center border-[#fff] border-[0.8px]`}>
          <Text style={tw`text-[#fff] text-[12px] font-401`}>
            {player.jersey_number}
          </Text>
        </View>
        <Text
          style={tw`text-[#fff] text-[12px] font-401 text-center mt-1 w-15 ml--3`}>
          {player.player_name}
        </Text>
      </View>
    ));
  };

  const currentTeam = selectedTeam === 'home' ? homeTeam : awayTeam;

  return (
    <View style={tw`m-5`}>
      <View style={tw`flex-row justify-center mb-3`}>
        <TouchableOpacity
          onPress={() => setSelectedTeam('home')}
          style={[
            tw`px-4 py-2 rounded-md`,
            selectedTeam === 'home' ? tw`bg-blue-500` : tw`bg-[#05102E]`,
          ]}>
          <Text style={tw`text-white text-[18px] font-401`}>
            HomeTeam: {homeTeam.name}
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

      <ImageBackground
        source={require('../../assets/footballField.png')}
        style={tw`h-200 w-full`}>
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
        {currentTeam && renderPlayers(currentTeam.lineups)}
      </ImageBackground>
    </View>
  );
};

export default Players;
