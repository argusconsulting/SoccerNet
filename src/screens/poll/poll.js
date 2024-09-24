import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';

const Poll = () => {
  const initialQuestions = [
    {
      id: 1,
      question: 'What is your favorite sports brand?',
      choices: [
        { id: 1, choice: 'Nike', votes: 60 },
        { id: 2, choice: 'Adidas', votes: 10 },
        { id: 3, choice: 'Puma', votes: 11 },
        { id: 4, choice: 'Reebok', votes: 18 },
      ],
    },
    {
      id: 2,
      question: 'Which football club do you support?',
      choices: [
        { id: 1, choice: 'Barcelona', votes: 55 },
        { id: 2, choice: 'Real Madrid', votes: 20 },
        { id: 3, choice: 'Manchester United', votes: 15 },
        { id: 4, choice: 'Juventus', votes: 10 },
      ],
    },
    {
      id: 3,
      question: 'What is your favorite sport?',
      choices: [
        { id: 1, choice: 'Football', votes: 70 },
        { id: 2, choice: 'Basketball', votes: 15 },
        { id: 3, choice: 'Tennis', votes: 8 },
        { id: 4, choice: 'Cricket', votes: 7 },
      ],
    },
    {
      id: 4,
      question: 'What is your preferred running shoe brand?',
      choices: [
        { id: 1, choice: 'Nike', votes: 80 },
        { id: 2, choice: 'Asics', votes: 30 },
        { id: 3, choice: 'New Balance', votes: 20 },
        { id: 4, choice: 'Adidas', votes: 10 },
      ],
    },
    {
      id: 5,
      question: 'Which sports channel do you watch the most?',
      choices: [
        { id: 1, choice: 'ESPN', votes: 50 },
        { id: 2, choice: 'Fox Sports', votes: 20 },
        { id: 3, choice: 'Sky Sports', votes: 10 },
        { id: 4, choice: 'NBC Sports', votes: 5 },
      ],
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedChoices, setSelectedChoices] = useState({});

  const handleChoicePress = (questionId, selectedChoice) => {
    const selectedId = selectedChoice.id;

    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedChoices = question.choices.map((choice) => {
          if (selectedChoices[questionId] === choice.id) {
            return { ...choice, votes: choice.votes - 1 };
          } else if (choice.id === selectedId) {
            return { ...choice, votes: choice.votes + 1 };
          }
          return choice;
        });
        return { ...question, choices: updatedChoices };
      }
      return question;
    });

    setQuestions(updatedQuestions);
    setSelectedChoices((prevState) => ({ ...prevState, [questionId]: selectedId }));
  };

  return (
    <View style={[tw`bg-[#000] flex-1`]}>
        <ScrollView>
        <Header name="Poll" />
        <View style={tw`p-5`}>
      {questions.map((question) => (
        <View key={question.id} style={[tw`bg-[#303649] p-4 mb-6 rounded-lg`]}>
          <Text style={[tw`text-white text-lg font-bold mb-2`]}>{question.question}</Text>
          {question.choices.map((choice) => {
            const totalVotes = question.choices.reduce((total, choice) => total + choice.votes, 0);
            const votePercentage = totalVotes > 0 ? (choice.votes / totalVotes) * 100 : 0;

            return (
              <View key={choice.id} style={[tw`mb-3`]}>
                <TouchableOpacity
                  style={[tw`flex-row justify-between py-2`]}
                  onPress={() => handleChoicePress(question.id, choice)}
                >
                  <Text style={tw`text-white`}>{choice.choice}</Text>
                  <Text style={tw`text-white`}>Votes: {choice.votes}</Text>
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
    backgroundColor: '#4caf50',
  },
});
