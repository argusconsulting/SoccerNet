import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../styles/tailwind';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ScoreCard = ({match, width, screen, navigate}) => {
  const navigation = useNavigation();

  // Function to extract scores for home and away teams
  const homeTeam = match?.participants?.find(
    participant => participant?.meta?.location === 'home',
  );
  const awayTeam = match?.participants?.find(
    participant => participant?.meta?.location === 'away',
  );

  let homeScore = 0;
  let awayScore = 0;

  // Sum up the scores based on the participant_id
  match?.scores?.forEach(score => {
    if (
      score?.score?.participant === 'home' &&
      score?.participant_id === homeTeam?.id
    ) {
      homeScore += score.score.goals;
    } else if (
      score?.score?.participant === 'away' &&
      score?.participant_id === awayTeam?.id
    ) {
      awayScore += score?.score.goals;
    }
  });


  // // // Check if any participant has the placeholder image
  // const hasPlaceholderImage = match?.participants?.some(
  //   participant =>
  //     participant?.image_path ===
  //     'https://cdn.sportmonks.com/images/soccer/team_placeholder.png',
  // );

  // // Do not render the ScoreCard if any participant has the placeholder image
  // if (hasPlaceholderImage) {
  //   return null;
  // }

  return (
    <TouchableOpacity
      style={[tw`bg-[#303649] pb-3  rounded-2xl mt-5 mx-2 w-full`, {width: width}]}
      onPress={() => navigation.navigate(navigate, {fixtureId: match?.id})}>
      <View style={tw`flex-row justify-between mx-3 `}>
        <Image
          source={{uri: match?.league?.image_path}}
          style={tw`w-7 h-7 mt-2 `}
        />
        {screen && (
          <Text
            style={tw`text-[#a9a9a9] text-[18px] font-400 leading-normal self-center mt-1.5 mr-8`}>
            {moment(match?.starting_at).format('MMMM Do YYYY')}
          </Text>
        )}
        {screen === 'liveNow' ? (
          <Text
            style={tw`text-red-500 text-[18px] font-401 leading-normal mt-1.5 `}>
            Live
          </Text>
        ) : (
          <Text
            style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 `}>
            {match?.length}"
          </Text>
        )}
      </View>

      <View style={tw`flex-row justify-between  mt-3  `}>
        <View style={tw`w-[40%]`}>
          <View
            style={[
              tw`w-14 h-14 self-center `, 
              {
                backgroundColor: '#fff', 
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 1}, 
                shadowOpacity: 0.25,
                shadowRadius: 4, 
                elevation: 5, 
                borderRadius: 999, 
              },
            ]}>
            
            <Image
              source={{uri: homeTeam?.image_path}}
              style={[
                tw`w-10 h-10 self-center mt-2`,
                {resizeMode: 'contain', borderRadius: 999},
              ]}
            />
          </View>
          {screen === 'Home' ? 
  <Text
    style={[
      tw`text-[#fff] text-[16px] font-400 leading-tight mt-1.5 w-23 self-center`,
      { textAlign: "center" }
    ]}
  >
    {homeTeam?.name.length > 9
      ? `${homeTeam.name.slice(0, 8)} ...`
      : homeTeam.name}
  </Text>
  :   
  <Text
            style={[tw`text-[#fff] text-[16px] font-400 leading-tight mt-1.5 w-23 self-center` ,{textAlign:"center"}]}>
            {homeTeam?.name}
          </Text>
}
        </View>
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 ml-3`}>
          {homeScore}
        </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 `}>
          -
        </Text>
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-1.5 mr-3`}>
          {awayScore}
        </Text>
        <View style={tw`w-[40%] `}>
          <View
            style={[
              tw`w-14 h-14 self-center`, 
              {
                backgroundColor: '#fff', 
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 1}, 
                shadowOpacity: 0.25, 
               shadowRadius: 4, 
                 elevation: 5,
                borderRadius: 999, 
              },
            ]}>
            {/* Image centered inside the shadowed circle */}
            <Image
              source={{uri: awayTeam?.image_path}}
              style={[
                tw`w-10 h-10 self-center mt-2`, // Image size and centering
                {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
              ]}
            />
          </View>
          {screen === 'Home' ?
  <Text
    style={[
      tw`text-[#fff] text-[16px] font-400 leading-tight mt-1.5 w-23 self-center`,
      { textAlign: "center" }
    ]}
  >
    {awayTeam?.name.length > 10
      ? `${awayTeam.name.slice(0, 10)}...`
      : awayTeam.name}
  </Text> : <Text
            style={[tw`text-[#fff] text-[16px] font-400 leading-tight mt-1.5 w-23 self-center` ,{textAlign:"center"}]}>
            {awayTeam?.name}
          </Text>
}
        </View>
      </View>

      {/* <Text
            style={[tw`text-[#ed2939] text-[16px] font-400 leading-tight mt-2 mx-3`,{textAlign:"center"}]}>
            Result: {' '}{match?.result_info}
          </Text> */}
    </TouchableOpacity>
  );
};

export default ScoreCard;
