import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={tw`bg-[#12122A] flex-1 `}>
      <Text
        style={tw`text-white text-[18px] font-401 leading-tight  my-3 mx-3 `}>
        Today
      </Text>
      <Calendar
        style={{
          borderWidth: 1,
          borderTopColor: 'gray',
          borderBottomColor: 'gray',
          height: 350,
        }}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#05102E',
          textSectionTitleColor: '#fff',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#fff',
          textDisabledColor: '#a9a9a9',
          arrowColor: 'white',
          indicatorColor: 'white',
          monthTextColor: 'white',
        }}
      />

      <View style={tw`bg-[#303649] w-90 py-3 mt-5 self-center rounded-lg`}>
        <View style={tw`flex-row `}>
          <Image
            source={require('../../assets/league_icons/league-3.png')}
            style={tw`w-9 h-9 self-center ml-3`}
          />
          <Text
            style={tw`text-white text-[20px] font-401 leading-tight self-center mx-3 `}>
            Premier League
          </Text>
        </View>

        <View style={tw`flex-row mt-3`}>
          <Image
            source={require('../../assets/league_icons/league-1.png')}
            style={tw`w-6 h-6 self-center ml-3`}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            Aston Villa
          </Text>

          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-2 `}>
            v/s
          </Text>

          <Image
            source={require('../../assets/league_icons/league-1.png')}
            style={tw`w-6 h-6 self-center ml-1`}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            Aston Villa
          </Text>
          <Text
            style={tw`text-[#a2a2a2] text-[18px] font-400 leading-tight self-center mx-3 `}>
         21:00 PM
          </Text>
        </View>
        <View style={tw`flex-row mt-3`}>
          <Image
            source={require('../../assets/league_icons/league-1.png')}
            style={tw`w-6 h-6 self-center ml-3`}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            Aston Villa
          </Text>

          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-2 `}>
            v/s
          </Text>

          <Image
            source={require('../../assets/league_icons/league-1.png')}
            style={tw`w-6 h-6 self-center ml-1`}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            Aston Villa
          </Text>
          <Text
            style={tw`text-[#a2a2a2] text-[18px] font-400 leading-tight self-center mx-3 `}>
         21:00 PM
          </Text>
        </View>
        <View style={tw`flex-row mt-3`}>
          <Image
            source={require('../../assets/league_icons/league-1.png')}
            style={tw`w-6 h-6 self-center ml-3`}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
            Aston Villa
          </Text>

          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-2 `}>
            v/s
          </Text>

          <Image
            source={require('../../assets/league_icons/league-3.png')}
            style={tw`w-6 h-6 self-center ml-1`}
          />
          <Text
            style={tw`text-white text-[18px] font-400 leading-tight self-center mx-1 `}>
    BrentFord
          </Text>
          <Text
            style={tw`text-[#a2a2a2] text-[18px] font-400 leading-tight self-center mx-3 `}>
         21:00 PM
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
