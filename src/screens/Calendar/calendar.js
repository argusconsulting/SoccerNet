import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';

const Calendar = () => {
  return (
    <View style={tw`bg-[#12122A] flex-1 p-5`}>
      <Text style={tw`text-white text-[36px] font-401 leading-tight  mt-1`}>
        Select a {'\n'}Language
      </Text>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
