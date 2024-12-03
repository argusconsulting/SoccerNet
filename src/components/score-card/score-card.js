import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../styles/tailwind';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ScoreCard = ({match, width, screen, navigate}) => {
  console.log('match', match);
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
      score.score.participant === 'home' &&
      score.participant_id === homeTeam.id
    ) {
      homeScore += score.score.goals;
    } else if (
      score.score.participant === 'away' &&
      score.participant_id === awayTeam.id
    ) {
      awayScore += score.score.goals;
    }
  });

  // Check if any participant has the placeholder image
  const hasPlaceholderImage = match?.participants?.some(
    participant =>
      participant?.image_path ===
      'https://cdn.sportmonks.com/images/soccer/team_placeholder.png',
  );

  // Do not render the ScoreCard if any participant has the placeholder image
  if (hasPlaceholderImage) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[tw`bg-[#303649] h-34  rounded-2xl mt-5 mx-2`, {width: width}]}
      onPress={() => navigation.navigate(navigate, {fixtureId: match?.id})}>
      <View style={tw`flex-row justify-between mx-3`}>
        <Image
          source={{uri: match?.league?.image_path}}
          style={tw`w-8 h-8 mt-2 `}
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

      <View style={tw`flex-row justify-between mx-10 mt-2`}>
        <View>
          <Image
            source={{uri: homeTeam?.image_path}}
            style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[16px] font-400 leading-normal mt-1.5 `}>
            {homeTeam?.name}
          </Text>
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
        <View>
          <Image
            source={{uri: awayTeam?.image_path}}
            style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[16px] font-400 leading-normal mt-1.5`}>
            {awayTeam?.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScoreCard;
