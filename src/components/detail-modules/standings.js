import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';

const Standings = () => {
  const data = [
    {
      key: '1',
      team: 'Man City',
      teamImg: require('../../assets/league_icons/league-2.png'),
      match: '31',
      wins: '31',
      draw: '7',
      loose: '3',
      goals: '98.53',
      points: '85',
    },
    {
      key: '2',
      team: 'Arsenal',
      teamImg: require('../../assets/league_icons/league-3.png'),
      match: '32',
      wins: '28',
      draw: '4',
      loose: '5',
      goals: '88.45',
      points: '80',
    },
    {
      key: '3',
      team: 'Liverpool',
      teamImg: require('../../assets/league_icons/league-2.png'),
      match: '31',
      wins: '29',
      draw: '5',
      loose: '4',
      goals: '85.30',
      points: '82',
    },
    {
      key: '4',
      team: 'Chelsea',
      teamImg: require('../../assets/league_icons/league-1.png'),
      match: '30',
      wins: '25',
      draw: '8',
      loose: '6',
      goals: '78.25',
      points: '75',
    },
    {
      key: '5',
      team: 'Tottenham',
      teamImg: require('../../assets/league_icons/league-3.png'),
      match: '32',
      wins: '24',
      draw: '7',
      loose: '6',
      goals: '76.50',
      points: '73',
    },
    {
      key: '6',
      team: 'Man United',
      teamImg: require('../../assets/league_icons/league-2.png'),
      match: '33',
      wins: '26',
      draw: '4',
      loose: '5',
      goals: '85.67',
      points: '77',
    },
    {
      key: '7',
      team: 'Leicester City',
      teamImg: require('../../assets/league_icons/league-2.png'),
      match: '30',
      wins: '21',
      draw: '6',
      loose: '10',
      goals: '68.24',
      points: '69',
    },
    {
      key: '8',
      team: 'Everton',
      teamImg: require('../../assets/league_icons/league-1.png'),
      match: '31',
      wins: '19',
      draw: '9',
      loose: '10',
      goals: '60.45',
      points: '67',
    },
    {
      key: '9',
      team: 'West Ham',
      teamImg: require('../../assets/league_icons/league-3.png'),
      match: '31',
      wins: '18',
      draw: '7',
      loose: '12',
      goals: '55.32',
      points: '61',
    },
    {
      key: '10',
      team: 'Southampton',
      teamImg: require('../../assets/league_icons/league-1.png'),
      match: '30',
      wins: '15',
      draw: '10',
      loose: '9',
      goals: '50.90',
      points: '60',
    },
    {
      key: '11',
      team: 'Aston Villa',
      teamImg: require('../../assets/league_icons/league-2.png'),
      match: '30',
      wins: '14',
      draw: '11',
      loose: '10',
      goals: '48.30',
      points: '59',
    },
  ];
  
  const renderItem = ({ item }) => (
    <View style={tw`flex-row justify-between py-2 items-center`}>
       <Text style={tw`text-white text-[14px]`}>{item.key}</Text>
       <View style={tw`flex-row w-23`}>
      <Image source={item.teamImg} style={[tw`w-4 h-4 mr-2 self-center`, { resizeMode: 'contain' }]} />
      <Text style={tw`text-white text-[14px] self-center `}>{item.team}</Text>
      </View>
      <Text style={tw`text-white text-[14px] self-center`}>{item.match}</Text>
      <Text style={tw`text-white text-[14px] self-center`}>{item.wins}</Text>
      <Text style={tw`text-white text-[14px] self-center`}>{item.draw}</Text>
      <Text style={tw`text-white text-[14px] self-center`}>{item.loose}</Text>
      <Text style={tw`text-white text-[14px] self-center`}>{item.goals}</Text>
      <Text style={tw`text-white text-[14px] self-center`}>{item.points}</Text>
    </View>
  );

  return (
    <View style={tw`bg-[#303649] p-5 m-5`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          #
        </Text>

        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center w-23`}>
          Team
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          M
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          W
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          D
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          L
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          G
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          PTS
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Standings;

const styles = StyleSheet.create({});
