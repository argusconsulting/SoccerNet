import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getTriviaCategory} from '../../redux/triviaSlice';
import Loader from '../../components/loader/Loader';

const data = [
  {id: '1', label: 'Did you Know'},
  {id: '2', label: 'Match Trivia'},
  {id: '3', label: 'Player Trivia'},
  {id: '4', label: 'Goal Scorer Quiz'},
];

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const boxSize = screenWidth / numColumns - 40; // Adjust the spacing

const Trivia = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Move useNavigation here
  const {isLoading, triviaCategory} = useSelector(state => state.trivia);

  useEffect(() => {
    dispatch(getTriviaCategory());
  }, []);

  const renderItem = ({item, index}) => {
    // Define a mapping for box and text colors
    const colorMapping = [
      {borderColor: '#2196F3', textColor: '#2196F3'}, // Blue
      {borderColor: '#FFC107', textColor: '#FFC107'}, // Yellow
      {borderColor: '#E91E63', textColor: '#E91E63'}, // Red
      {borderColor: '#4CAF50', textColor: '#4CAF50'}, // Green
    ];

    // Get the color configuration for the current index
    const colors = colorMapping[index] || {
      borderColor: '#FFFFFF',
      textColor: '#A9A9A9',
    }; // Default colors

    const imageMapping = {
      'Football Facts': require('../../assets/Football_Facts.png'),
      'Rules of the Games': require('../../assets/Rules_of_the_Game.png'),
      'Record Breakers': require('../../assets/Record_Breakers.png'),
      'Historical Moments': require('../../assets/Historical_Moments.png'),
    };

    return (
      <TouchableOpacity
        style={[
          tw`rounded-xl justify-center items-center`,
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            borderColor: colors.borderColor,
            borderWidth: 1,
          },
        ]}
        onPress={() => {
          navigation.navigate('TriviaQuestions', {
            categoryId: item?.id,
            categoryName: item?.name,
          });
        }}>
        {imageMapping[item?.name] && (
          <Image
            source={imageMapping[item?.name]}
            style={tw`w-16 h-16 mb-2`}
            resizeMode="contain"
          />
        )}
        <Text
          style={[
            tw`text-[18px] font-402 leading-tight self-center w-24 mt-2 text-center`,
            {color: colors.textColor},
          ]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="" />

      <Image
        source={require('../../assets/Trivia.png')}
        style={tw`w-61 mb-10 h-15 self-center`}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={triviaCategory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.container}
        />
      )}

      <Image
        source={require('../../assets/trivia-bg.png')}
        style={tw`w-full h-40 self-center`}
      />
    </View>
  );
};

export default Trivia;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: 'transparent',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
});
