import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../styles/tailwind';
import { useNavigation } from '@react-navigation/native';

const ScoreCard = ({match , width, screen, navigate}) => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity style={[tw`bg-[#303649] h-34  rounded-2xl mt-5 mx-2`,{width :width}]} onPress={()=> navigation.navigate(navigate)}>
      <View style={tw`flex-row justify-between`}>
        <Image source={match?.leagueLogo} style={tw`w-8 h-8 mt-2 ml-3`} />
        {screen &&  <Text
          style={tw`text-[#a9a9a9] text-[18px] font-400 leading-normal self-center mt-1.5`}>
          {match?.date}
        </Text>}
       {screen === "liveNow" ?
        <Text
        style={tw`text-red-500 text-[18px] font-401 leading-normal mt-1.5 mr-3`}>
   Live
      </Text>:
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 mr-3`}>
          {match?.time}
        </Text>
}
      </View>
    
      <View style={tw`flex-row justify-between mx-10 mt-2`}>
        <View>
          <Image
            source={match?.homeTeamLogo}
            style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[16px] font-400 leading-normal mt-1.5 `}>
            {match?.homeTeam}
          </Text>
        </View>
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 ml-3`}>
          {match?.homeScore}
        </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 `}>
          -
        </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 mr-3`}>
          {match?.awayScore}
        </Text>
        <View>
          <Image
            source={match?.awayTeamLogo}
            style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[16px] font-400 leading-normal mt-1.5`}>
            {match?.awayTeam}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScoreCard;

