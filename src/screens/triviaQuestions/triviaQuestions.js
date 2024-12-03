import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from '../../styles/tailwind';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {triviaQuestionsApi} from '../../redux/triviaSlice';
import RenderHtml from 'react-native-render-html';
import Loader from '../../components/loader/Loader'; // Assuming Loader is your custom loading component

const TriviaQuestions = ({}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryId = route?.params?.categoryId;
  const categoryName = route?.params?.categoryName;
  const questions = useSelector(state => state?.trivia?.triviaQuestions);
  const isLoading = useSelector(state => state?.trivia?.isLoading);

  const customStyles = {
    body: tw`text-[#fff] text-[18px] leading-tight w-full`,
    p: tw`text-[#fff]`,
  };

  useEffect(() => {
    dispatch(triviaQuestionsApi({id: categoryId}));
  }, [categoryId]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = option => {
    setSelectedOption(option.id);
    setIsCorrect(option.is_correct);
  };

  const renderQuestion = ({item}) => (
    <View>
      <RenderHtml
        contentWidth={100}
        source={{html: item?.question_text}}
        tagsStyles={customStyles}
      />

      <View style={tw`mt-5`}>
        {/* Looping over options */}
        {item?.options?.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              tw`p-4 rounded-lg my-2`,
              selectedOption === option.id
                ? isCorrect
                  ? tw`bg-green-500` // Correct option
                  : tw`bg-red-500` // Wrong option
                : tw`bg-[#303649]`, // Default option background
            ]}
            onPress={() => handleOptionSelect(option)}>
            <RenderHtml
              contentWidth={100}
              source={{html: `${option.option_text || 'No text available'}`}}
              tagsStyles={customStyles}
            />
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
          {categoryName}
        </Text>
      </View>

      {/* Loader while data is being fetched */}
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Loader />
        </View>
      ) : questions && questions.length > 0 ? (
        <>
          <FlatList
            data={[questions[currentQuestionIndex]]}
            renderItem={renderQuestion}
            keyExtractor={item => item?.id.toString()}
          />

          <View style={tw`flex-row justify-between mt-5`}>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal mx-5 mt-4`}>
              {currentQuestionIndex + 1} / {questions?.length}
            </Text>
            <TouchableOpacity
              onPress={handleBack}
              disabled={currentQuestionIndex === 0}
              style={[
                tw`mt-1 rounded-xl justify-center `,
                currentQuestionIndex === 0 && tw`opacity-50`,
                {width: 120, height: 50},
              ]}>
              <LinearGradient
                colors={['#6A36CE', '#2575F6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[
                  tw`rounded-xl justify-center`,
                  {flex: 1, justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text
                  style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
                  Back
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              style={[
                tw`mt-1 rounded-xl justify-center `,
                currentQuestionIndex === questions.length - 1 && tw`opacity-50`,
                {width: 120, height: 50},
              ]}>
              <LinearGradient
                colors={['#6A36CE', '#2575F6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[
                  tw`rounded-xl justify-center`,
                  {flex: 1, justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text
                  style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
                  Next
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-[#fff] text-[20px] font-401`}>
            No questions found !
          </Text>
        </View>
      )}
    </View>
  );
};

export default TriviaQuestions;

const styles = StyleSheet.create({});
