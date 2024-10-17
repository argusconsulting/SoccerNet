import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import {useDispatch, useSelector} from 'react-redux';
import {getPollData, pollVoteData} from '../../redux/pollSlice';
import Loader from '../../components/loader/Loader';

const Poll = () => {
  const dispatch = useDispatch();
  const apiPolls = useSelector(state => state.poll?.userPollData);
  const isLoading = useSelector(state => state.poll.isLoading);

  // Local state to manage the polls and track votes
  const [questions, setQuestions] = useState([]);
  const [userVotes, setUserVotes] = useState({}); // Track which polls the user voted for

  useEffect(() => {
    // Dispatch action to fetch poll data when component mounts
    dispatch(getPollData());
  }, [dispatch]);

  useEffect(() => {
    if (apiPolls && apiPolls.length > 0) {
      setQuestions(apiPolls);
    }
  }, [apiPolls]);

  const handleChoicePress = (pollId, selectedChoice) => {
    const selectedId = selectedChoice.id;

    // Check if the user already voted for this poll
    if (userVotes[pollId]) return; // Prevent further votes

    // Update the votes for the selected choice
    const updatedQuestions = questions.map(question => {
      if (question.id === pollId) {
        const updatedChoices = question.options.map(option =>
          option.id === selectedId
            ? {...option, votes_count: option.votes_count + 1}
            : option,
        );

        return {...question, options: updatedChoices};
      }
      return question;
    });

    setQuestions(updatedQuestions);

    // Mark the poll as voted in local state
    setUserVotes(prevState => ({...prevState, [pollId]: true}));

    // Dispatch the vote action with the option ID
    dispatch(pollVoteData({id: selectedId, pollId}));
  };

  return (
    <View style={[tw`bg-[#000] flex-1`]}>
      <ScrollView>
        <Header name="Poll" />
        {isLoading ? (
          <Loader />
        ) : (
          <View style={tw`p-5`}>
            {questions.map(question => (
              <View
                key={question.id}
                style={[tw`bg-[#303649] p-4 mb-6 rounded-lg`]}>
                <Text style={[tw`text-white text-lg font-bold mb-2`]}>
                  {question.title}
                </Text>
                {question.options.map(option => {
                  const totalVotes = question.options.reduce(
                    (total, option) => total + option.votes_count,
                    0,
                  );
                  const votePercentage =
                    totalVotes > 0
                      ? (option.votes_count / totalVotes) * 100
                      : 0;

                  return (
                    <View key={option.id} style={[tw`mb-3`]}>
                      <TouchableOpacity
                        disabled={userVotes[question.id]} // Disable if user already voted
                        style={[
                          tw`flex-row justify-between py-2`,
                          userVotes[question.id] && {opacity: 0.6}, // Apply opacity if disabled
                        ]}
                        onPress={() => handleChoicePress(question.id, option)}>
                        <Text style={tw`text-white`}>{option.option_text}</Text>
                        <Text style={tw`text-white`}>
                          Votes: {votePercentage.toFixed(0)}%
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.progressBarBackground}>
                        <View
                          style={[
                            styles.progressBar,
                            {width: `${votePercentage}%`},
                          ]}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Poll;

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#435AE5',
  },
});
