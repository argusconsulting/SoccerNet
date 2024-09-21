import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';

const ScoreCard = ({item}) => {
  return (
    <View style={tw`bg-[#303649] w-70 h-32 rounded-lg mx-2`}>
      <View style={tw`flex-row justify-between mx-2`}>
        <Image
          source={require('../../assets/league_icons/league-1.png')}
          style={tw`w-6 h-6 mt-2 `}
        />
        <Text style={tw`text-white text-[16px] font-401 leading-tight mt-2 `}>
          87"
        </Text>
      </View>
      <View style={tw`flex-row justify-center`}>
        <View>
          <Image
            source={require('../../assets/league_icons/league-2.png')}
            style={tw`w-10 h-10 mt-2 self-center`}
          />
          <Text
            style={tw`text-white text-[16px] font-401 leading-tight mt-2 self-center`}>
            Man City
          </Text>
        </View>
        <Text
          style={tw`text-white text-[16px] font-401 leading-tight mt-4 mx-6 `}>
          1{'   '} - {'   '} 1
        </Text>
        <View>
          <Image
            source={require('../../assets/league_icons/league-3.png')}
            style={tw`w-10 h-10 mt-2 self-center`}
          />
          <Text
            style={tw`text-white text-[16px] font-401 leading-tight mt-2 self-center`}>
            Man United
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({});
