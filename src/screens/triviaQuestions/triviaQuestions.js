import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from '../../styles/tailwind';
import { triviaData } from '../../helpers/dummyData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';



const TriviaQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentQuestionIndex < triviaData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = ({ item }) => (
    <View>
      <Text style={tw`text-[#fff] text-[20px] font-400 leading-normal mt-8`}>
        {item.question}
      </Text>
      <View style={tw`mt-5`}>
        {Object.entries(item.choices).map(([key, value]) => (
          <TouchableOpacity key={key} style={tw`p-4 bg-[#303649] rounded-lg my-2`}>
            <Text style={tw`text-[#fff] text-[18px] font-401`}>{`${key.toUpperCase()}: ${value}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] h-full p-5`}>
      <View style={tw`flex-row`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'arrowleft'}
            size={24}
            color={'#fff'}
            style={tw`mt-2`}
          />
        </TouchableOpacity>
        <Text style={tw`text-[#fff] text-[26px] font-401 leading-normal mx-5`}>
          Trivia
        </Text>
      </View>
      <View style={tw`flex-row justify-between mt-5`}>
      <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal`}>
          Did you know
        </Text>
        <Text style={tw`text-[#fff] text-[16px] font-400 leading-normal mx-5`}>
          Skip
        </Text>
        </View>

      <FlatList
        data={[triviaData[currentQuestionIndex]]}
        renderItem={renderQuestion}
        keyExtractor={item => item.id.toString()}
   
      />

      <View style={tw`flex-row justify-between mt-5`}>
      <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal mx-5 mt-4`}>
  {currentQuestionIndex +1}  / {triviaData?.length}
        </Text>
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentQuestionIndex === 0}
        style={[
            tw`mt-1 rounded-xl justify-center `,
            currentQuestionIndex === 0 && tw`opacity-50`,
            {
              width: 120,
              height: 50,
            },
          ]}
          >
         <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-xl justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
          Back
          </Text>
        </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentQuestionIndex === triviaData.length - 1}
        style={[
            tw`mt-1 rounded-xl justify-center `,
            currentQuestionIndex === triviaData.length - 1 && tw`opacity-50`,
            {
              width: 120,
              height: 50,
            },
          ]}
          >
          <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-xl justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
          Next
          </Text>
        </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TriviaQuestions;

const styles = StyleSheet.create({});
