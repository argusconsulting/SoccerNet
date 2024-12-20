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

      <View style={tw`flex-row justify-between mx-10 `}>
        <View>
          <View
            style={[
              tw`w-14 h-14 self-center`, // Parent container size
              {
                backgroundColor: '#fff', // Background for shadow area (optional for contrast)
                shadowColor: '#fff', // Shadow color
                shadowOffset: {width: 0, height: 1}, // Shadow position
                shadowOpacity: 0.25, // Shadow transparency
                shadowRadius: 4, // Shadow blur
                elevation: 16, // Shadow for Android
                borderRadius: 999, // Circular shadow
              },
            ]}>
            {/* Image centered inside the shadowed circle */}
            <Image
              source={{uri: homeTeam?.image_path}}
              style={[
                tw`w-10 h-10 self-center mt-2`, // Image size and centering
                {resizeMode: 'contain', borderRadius: 999}, // Make the image circular
              ]}
            />
          </View>

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
          <View
            style={[
              tw`w-14 h-14 self-center`, // Parent container size
              {
                backgroundColor: '#fff', // Background for shadow area (optional for contrast)
                shadowColor: '#fff', // Shadow color
                shadowOffset: {width: 0, height: 1}, // Shadow position
                shadowOpacity: 0.25, // Shadow transparency
                shadowRadius: 4, // Shadow blur
                elevation: 16, // Shadow for Android
                borderRadius: 999, // Circular shadow
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
