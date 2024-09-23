import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import tw from '../../styles/tailwind';
import {useNavigation} from '@react-navigation/native';

const LeagueModal = ({isVisible, toggleModal}) => {
  const navigation = useNavigation(); // Corrected variable name

  const DATA = [
    {
      id: '1',
      icon: require('../../assets/icons/user.png'),
      title: 'Profile',
      navigate: 'Profile', // Screen name for navigation
    },
    {
      id: '2',
      icon: require('../../assets/icons/highlights.png'),
      title: 'Highlights',
      navigate: 'Highlights', // Example screen name
    },
    {
      id: '3',
      icon: require('../../assets/icons/quiz.png'),
      title: 'Trivia',
      navigate: 'Trivia', // Example screen name
    },
    {
      id: '4',
      icon: require('../../assets/icons/comments.png'),
      title: 'Discussions',
      navigate: 'Discussions', // Example screen name
    },
    {
      id: '5',
      icon: require('../../assets/icons/spotlight.png'),
      title: 'Spotlight',
      navigate: 'Spotlight', // Example screen name
    },
    {
      id: '6',
      icon: require('../../assets/icons/people-poll.png'),
      title: 'Poll',
      navigate: 'Poll', // Example screen name
    },
    {
      id: '7',
      icon: require('../../assets/icons/newspaper.png'),
      title: 'News',
      navigate: 'News', // Example screen name
    },
    {
      id: '8',
      icon: require('../../assets/icons/photo-capture.png'),
      title: 'Photos',
      navigate: 'Photos', // Example screen name
    },
    {
      id: '9',
      icon: require('../../assets/icons/live.png'),
      title: 'Live Now',
      navigate: 'LiveNow', // Example screen name
    },
  ];

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item?.navigate) {
          navigation.navigate(item.navigate);
          toggleModal();
        }
      }}
      style={[tw`p-3 mt-7 w-30`]}>
      <Image
        source={item?.icon}
        style={[tw`w-7 h-7 self-center`, {resizeMode: 'contain'}]}
      />
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-3 self-center`}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      style={tw`m-0 justify-end`}>
      <View style={tw`bg-[#303649] h-[50%] rounded-t-3xl`}>
        <FlatList
          numColumns={3}
          data={DATA}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={tw`ml-5`}
        />
        {/* <Button title="Hide modal" onPress={toggleModal} /> */}
      </View>
    </Modal>
  );
};

export default LeagueModal;

const styles = StyleSheet.create({});
