import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import tw from '../../styles/tailwind';

const data = [
  { key: '1', home: '72%', possession: 'Ball Possession', away: '28%' },
  { key: '2', home: '65%', possession: 'Shots', away: '35%' },
  { key: '3', home: '60%', possession: 'Shots on Goals', away: '40%' },
  { key: '4', home: '55%', possession: 'Pass', away: '45%' },
  { key: '5', home: '70%', possession: 'Pass Accuracy', away: '30%' },
  { key: '6', home: '68%', possession: 'Foul', away: '32%' },
  { key: '7', home: '60%', possession: 'Shots on Goals', away: '40%' },
  { key: '8', home: '55%', possession: 'Pass', away: '45%' },
  { key: '9', home: '70%', possession: 'Pass Accuracy', away: '30%' },
  { key: '16', home: '68%', possession: 'Foul', away: '32%' },
    { key: '10', home: '60%', possession: 'Shots on Goals', away: '40%' },
  { key: '11', home: '55%', possession: 'Pass', away: '45%' },
  { key: '13', home: '70%', possession: 'Pass Accuracy', away: '30%' },

];

const renderItem = ({ item }) => (
  <View style={tw`flex-row justify-between py-2`}>
    <Text style={tw`text-white text-[16px]`}>{item.home}</Text>
    <Text style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
      {item.possession}
    </Text>
    <Text style={tw`text-white text-[16px]`}>{item.away}</Text>
  </View>
);

const Statistics = () => {
  return (
    <View style={tw`bg-[#303649] p-5 m-5`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <Image
          source={require('../../assets/league_icons/league-1.png')}
          style={[tw`w-8 h-8`, { resizeMode: 'contain' }]}
        />
        <Text style={tw`text-[#fff] text-[20px] font-400 leading-normal self-center`}>
          TEAM STATS
        </Text>
        <Image
          source={require('../../assets/league_icons/league-3.png')}
          style={[tw`w-8 h-8`, { resizeMode: 'contain' }]}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
