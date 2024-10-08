import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import { useDispatch, useSelector } from 'react-redux';
import { getPollData, pollVoteData } from '../../redux/pollSlice';
import Loader from '../../components/loader/Loader';

const Poll = () => {

  const dispatch = useDispatch();
  const apiPolls = useSelector((state) => state.poll?.userPollData);
  const isLoading = useSelector((state)=> state.poll.isLoading)

  // Local state to manage the polls
  const [questions, setQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState({});

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
    console.log("pollId,,,,,",pollId)
    const selectedId = selectedChoice.id;

    const updatedQuestions = questions.map((question) => {
      if (question.id === pollId) {
        const updatedChoices = question.options.map((option) => {
          // Check if the user has already voted for this choice
          if (selectedChoices[pollId] === option.id) {
            // If the user clicks the same item again, we "unvote" it
            return { ...option, votes_count: option.votes_count - 1 };
          } else if (option.id === selectedId) {
            // If the user selects a different item, we add 1 to the new choice's votes
            return { ...option, votes_count: option.votes_count + 1 };
          }
          return option; // No change for other choices
        });

        return { ...question, options: updatedChoices };
      }
      return question;
    });

    setQuestions(updatedQuestions);
    
    // Update the user's selected choice for this question (or reset it if they unvoted)
    setSelectedChoices((prevState) =>
      prevState[pollId] === selectedId
        ? { ...prevState, [pollId]: null } // If the user unvoted, clear the selection
        : { ...prevState, [pollId]: selectedId } // Update to the new selection
    );
    
    // Dispatch the vote action with the option ID
    dispatch(pollVoteData({id:selectedId , pollId}));  // Pass the selected choice's ID
  };

  return (
    <View style={[tw`bg-[#000] flex-1`]}>
      <ScrollView>
        <Header name="Poll" />
        {isLoading ? <Loader/>:
        <View style={tw`p-5`}>
          {questions.map((question) => (
            <View key={question.id} style={[tw`bg-[#303649] p-4 mb-6 rounded-lg`]}>
              <Text style={[tw`text-white text-lg font-bold mb-2`]}>{question.title}</Text>
              {question.options.map((option) => {
                // Recalculate total votes and vote percentage
                const totalVotes = question.options.reduce((total, option) => total + option.votes_count, 0);
                const votePercentage = totalVotes > 0 ? (option.votes_count / totalVotes) * 100 : 0;

                return (
                  <View key={option.id} style={[tw`mb-3`]}>
                    <TouchableOpacity
                      style={[tw`flex-row justify-between py-2`]}
                      onPress={() => handleChoicePress(question.id, option)}
                    >
                      <Text style={tw`text-white`}>{option.option_text}</Text>
                      <Text style={tw`text-white`}>Votes: {votePercentage.toFixed(0)}%</Text>
                    </TouchableOpacity>
                    <View style={styles.progressBarBackground}>
                      <View style={[styles.progressBar, { width: `${votePercentage}%` }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
}
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
