// Menu.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLogout} from '../../redux/authSlice';
import {customAlert} from '../../scripts/functions';
import {t} from 'i18next';

function Menu({modalVisible, toggleModal}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      icon: require('../../assets/icons/user.png'),
      title: 'Profile',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      icon: require('../../assets/icons/highlights.png'),
      title: 'Highlights',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      icon: require('../../assets/icons/quiz.png'),

      title: 'Trivia',
    },
    {
      id: '0a3d5f78-3eae-4a0c-810b-6637687e99f',
      icon: require('../../assets/icons/comments.png'),

      title: 'Discussion',
    },
    {
      id: '0a3d5f78-3eae-4a0c-810b-66e799f',
      icon: require('../../assets/icons/spotlight.png'),

      title: 'SpotLight',
    },
    {
      id: '0a3d5f78-3eae-4a0c-810b-6637e799f',
      icon: require('../../assets/icons/people-poll.png'),
      title: 'Poll',
    },
    {
      id: '0a5f78-3eae-4a0c-810b-6637687e799f',
      icon: require('../../assets/icons/newspaper.png'),
      title: 'News',
    },
    {
      id: '0a378-3eae-4a0c-810b-6637687e799f',
      icon: require('../../assets/icons/photo-capture.png'),
      title: 'Photos',
    },
    {
      id: '0a378-3eae-4a0c-810b-67e799f',
      icon: require('../../assets/icons/highlights.png'),
      title: 'Video Highlights',
    },
    {
      id: '0a3d5f78-3e6e-4a0c-810b-6637687e799f',
      icon: require('../../assets/icons/live.png'),
      title: 'LiveNow',
    },

    {
      id: '333acb48-34bb-4d56-ae50-62gh625u3b26',
      icon: require('../../assets/icons/logout.png'),
      title: 'Logout',
    },
  ];

  const slideInLeft = {
    from: {
      translateX: -500, // Start off-screen to the left
    },
    to: {
      translateX: 0, // End at the original position
    },
  };

  const slideOutRight = {
    from: {
      translateX: 0, // Start at the original position
    },
    to: {
      translateX: -500, // End off-screen to the right
    },
  };

  const navigateToScreen = (navigation, title) => {
    switch (title) {
      case 'Profile':
        toggleModal();
        navigation.navigate('Profile');
        break;
      case 'Highlights':
        toggleModal();
        navigation.navigate('Highlights');
        break;
      case 'Trivia':
        toggleModal();
        navigation.navigate('Trivia');
        break;
      case 'Discussion':
        toggleModal();
        navigation.navigate('Discussion');
        break;
      case 'SpotLight':
        toggleModal();
        navigation.navigate('SpotLight');
        break;
      case 'Poll':
        toggleModal();
        navigation.navigate('Poll');
        break;
      case 'News':
        toggleModal();
        navigation.navigate('News');
        break;
      case 'Photos':
        toggleModal();
        navigation.navigate('Photos');
        break;
      case 'Video Highlights':
        toggleModal();
        navigation.navigate('videoHighlights');
        break;
      case 'LiveNow':
        toggleModal();
        navigation.navigate('LiveNow');
        break;

      case 'Logout':
        toggleModal();
        handleLogout();
        break;

      default:
        console.warn('No screen found for ', title);
    }
  };

  const handleLogout = () => {
    customAlert('Are you sure you want to logout ?', 'YES', () =>
      dispatch(userLogout()),
    );
  };

  const Item = ({title, onPress, icon}) => (
    <View style={tw`p-4`}>
      <TouchableOpacity onPress={onPress}>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex-row`}>
            <Image
              source={icon}
              style={[tw`w-5 h-5 self-center mr-5`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[16px] font-400 mt-1 leading-tight`}>
              {t(title)}
            </Text>
          </View>
          <Feather
            name={'arrow-up-right'}
            size={22}
            color={'#fff'}
            style={tw``}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1`}>
      <Modal
        isVisible={modalVisible}
        style={tw`m-0 absolute left-0 right-0 h-full `}
        animationIn={slideInLeft}
        animationOut={slideOutRight}
        animationInTiming={600}
        animationOutTiming={600}
        onBackdropPress={toggleModal}>
        <View style={tw`flex-1 w-[80%] h-full bg-[#303649] rounded-md`}>
          <View style={tw`flex-row justify-between mx-5 m-5`}>
            <Text style={tw`text-[22px] text-[#fff]  font-401 leading-tight`}>
              {t('Menu')}
            </Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <AntDesign name={'close'} size={22} color={'#fff'} style={tw``} />
            </TouchableOpacity>
          </View>

          <View style={tw`border-b border-[#d9d9d9]`} />

          <FlatList
            data={DATA}
            renderItem={({item}) => (
              <Item
                title={item.title}
                icon={item?.icon}
                onPress={() => navigateToScreen(navigation, item.title)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Menu;
