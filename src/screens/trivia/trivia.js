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

  const renderItem = ({item}) => {
    console.log("item---------", item)
    return (
      <TouchableOpacity
    
        onPress={() => {navigation.navigate('TriviaQuestions', {categoryId: item?.id , categoryName: item?.name});
        }}>
<Image
  source={typeof item?.image === 'string' ? {uri: item?.image} : item?.image} 
   style={[
          tw`rounded-xl border-[#fff] border-[0.5px]  `,
          styles.box,
          {width: boxSize, height: boxSize},
        ]}
/> 

       </TouchableOpacity>
    );
  };

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Trivia" />

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
    </View>
  );
};

export default Trivia;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: '#303649',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:"cover"
  },

});
