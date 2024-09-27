// import {Image, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import tw from '../../styles/tailwind';

// const ScoreCard = ({item}) => {
//   return (
//     <View style={tw`bg-[#303649] w-70 h-32 rounded-lg mx-2`}>
//       <View style={tw`flex-row justify-between mx-2`}>
//         <Image
//           source={require('../../assets/league_icons/league-1.png')}
//           style={tw`w-6 h-6 mt-2 `}
//         />
//         <Text style={tw`text-white text-[16px] font-401 leading-tight mt-2 `}>
//           87"
//         </Text>
//       </View>
//       <View style={tw`flex-row justify-center`}>
//         <View>
//           <Image
//             source={require('../../assets/league_icons/league-2.png')}
//             style={tw`w-10 h-10 mt-2 self-center`}
//           />
//           <Text
//             style={tw`text-white text-[16px] font-401 leading-tight mt-2 self-center`}>
//             Man City
//           </Text>
//         </View>
//         <Text
//           style={tw`text-white text-[16px] font-401 leading-tight mt-4 mx-6 `}>
//           1{'   '} - {'   '} 1
//         </Text>
//         <View>
//           <Image
//             source={require('../../assets/league_icons/league-3.png')}
//             style={tw`w-10 h-10 mt-2 self-center`}
//           />
//           <Text
//             style={tw`text-white text-[16px] font-401 leading-tight mt-2 self-center`}>
//             Man United
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ScoreCard;

// const styles = StyleSheet.create({});

import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../styles/tailwind';
import { useNavigation } from '@react-navigation/native';

const ScoreCard = ({match , width, screen, navigate}) => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity style={[tw`bg-[#303649] h-34  rounded-2xl mt-5 mx-2`,{width :width}]} onPress={()=> navigation.navigate(navigate)}>
      <View style={tw`flex-row justify-between`}>
        <Image source={match?.leagueLogo} style={tw`w-5 h-5 mt-2 ml-3`} />
        {screen &&  <Text
          style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5`}>
          {match?.date}
        </Text>}
       {screen === "liveNow" ?
        <Text
        style={tw`text-red-500 text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
   Live
      </Text>:
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
          {match?.time}
        </Text>
}
      </View>
    
      <View style={tw`flex-row justify-between mx-12 mt-3`}>
        <View>
          <Image
            source={match?.homeTeamLogo}
            style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5 `}>
            {match?.homeTeam}
          </Text>
        </View>
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 ml-3`}>
          {match?.homeScore}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 `}>
          -
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
          {match?.awayScore}
        </Text>
        <View>
          <Image
            source={match?.awayTeamLogo}
            style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5`}>
            {match?.awayTeam}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({});
