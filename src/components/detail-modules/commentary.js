import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';

const Commentary = () => {
  const DATA = [
    {
      minutes: '12',
      commentary:
        'A great pass by J. Grealish leads to an opportunity for M. Rashford.',
      goal: {
        img: require('../../assets/icons/football.png'),
        playerName: 'M. Rashford',
      },
    },
    {
      minutes: '29',
      commentary: 'A tough tackle leads to a red card for B. Silva.',
      redCard: {
        img: require('../../assets/icons/red-card.png'),
        playerName: 'B. Silva',
      },
    },
    {
      minutes: '45',
      commentary:
        'What a strike! J. Maddison curls it into the top corner.',
      goal: {
        img: require('../../assets/icons/football.png'),
        playerName: 'J. Maddison',
      },
    },
    {
      minutes: '60',
      commentary:
        'A double whammy as R. Dias receives a red card and concedes a penalty.',
      redCard: {
        img: require('../../assets/icons/red-card.png'),
        playerName: 'R. Dias',
      },
    },
    {
      minutes: '75',
      commentary: 'A crucial block by H. Maguire prevents a sure goal.',
    },
  ];

  const Item = ({ item, index }) => (
    <View
      style={[
        index % 2 === 0 ? tw`bg-[#303649]` : null, // Apply bg for alternate items
        tw`mt-5 rounded-sm p-3`
      ]}
    >
      <View style={tw`flex-row w-full`}>
        <View style={tw`w-7`}>
          <Text style={tw`text-[#fff] text-[16px] font-401 leading-tight`}>
            {item?.minutes}"
          </Text>
        </View>
        <View style={tw`w-70`}>
          <Text style={tw`text-[#a2a2a2] text-[14px] font-400 leading-tight w-70`}>
            {item?.commentary}
          </Text>
        </View>
      </View>
  
      {item?.goal && (
        <View style={tw`flex-row mx-5 mt-3`}>
          <Image
            source={item?.goal?.img}
            style={[tw`w-3.5 h-3.5`, { resizeMode: 'contain' }]}
          />
          <Text style={tw`text-[#fff] text-[14px] font-401 leading-tight ml-2`}>
            {item?.goal.playerName}"
          </Text>
        </View>
      )}
  
      {item?.redCard && (
        <View style={tw`flex-row mx-5 mt-3`}>
          <Image
            source={item?.redCard?.img}
            style={[tw`w-3.5 h-3.5`, { resizeMode: 'contain' }]}
          />
          <Text style={tw`text-[#fff] text-[14px] font-401 leading-tight ml-2`}>
            {item?.redCard.playerName}"
          </Text>
        </View>
      )}
    </View>
  );
  

  return (
    <View style={tw`p-7`}>
     <FlatList
  data={DATA}
  renderItem={({ item, index }) => <Item item={item} index={index} />}
  keyExtractor={(item, index) => index.toString()}
/>
    </View>
  );
};

export default Commentary;

const styles = StyleSheet.create({});
