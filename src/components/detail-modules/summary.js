import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';

const Summary = () => {
  return (
    <View style={tw`bg-[#303649] p-5 m-5`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <Image
          source={require('../../assets/league_icons/league-1.png')}
          style={[tw`w-6 h-6`, {resizeMode: 'contain'}]}
        />
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
          85"
        </Text>
        <Image
          source={require('../../assets/league_icons/league-3.png')}
          style={[tw`w-6 h-6`, {resizeMode: 'contain'}]}
        />
      </View>
      <View style={tw`flex-row justify-center mb-4`}>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
          1{'    '}-
        </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
          {'    '}1
        </Text>
      </View>

      <View style={tw`flex-row justify-between mb-4  w-full`}>
        <Text style={tw`w-30 `}> </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center `}>
          90'
        </Text>
        <View style={tw`flex-row  w-30`}>
          <Image
            source={require('../../assets/icons/red-card.png')}
            style={[tw`w-4 h-4 self-center mr-1`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
            G.Magalhaes
          </Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-4  w-full`}>
        <Text style={tw`w-30 `}> </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center `}>
          90'
        </Text>
        <View style={tw`flex-row  w-30`}>
          <Image
            source={require('../../assets/icons/yellow-card.png')}
            style={[tw`w-4 h-4 self-center mr-1`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
            B.Saka
          </Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-4  w-full`}>
        <Text style={tw`w-30 `}> </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center `}>
          90'
        </Text>
        <View style={tw`flex-row  w-30`}>
          <Image
            source={require('../../assets/icons/yellow-card.png')}
            style={[tw`w-4 h-4 self-center mr-1`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
            R.Holding
          </Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-4  w-full`}>
        <View style={tw`flex-row  w-30`}>
          <View>
            <Text
              style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
              I.Gundogan
            </Text>
            <Text
              style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
              Gabriel Jesus
            </Text>
          </View>
          <Image
            source={require('../../assets/icons/change.png')}
            style={[tw`w-4 h-4 self-center ml-1`, {resizeMode: 'contain'}]}
          />
        </View>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center `}>
          34'
        </Text>
        <View style={tw`flex-row  w-30`}>
          <Text
            style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
            {' '}
          </Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-4  w-full`}>
        <Text style={tw`w-30 `}> </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center `}>
          65'
        </Text>
        <View style={tw`flex-row  w-30`}>
          <Image
            source={require('../../assets/icons/yellow-card.png')}
            style={[tw`w-4 h-4 self-center mr-1`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[18px] font-400 leading-normal self-center`}>
            R.Holding
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({});
