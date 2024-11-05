import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import moment from 'moment'; // You can use this library for date formatting
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const SpotLight = () => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      roomName: 'Football Room',
      dateTime: '2024-09-27 12:00 PM',
      shortDesc: 'Discuss the latest football matches.Chat about the latest',
      userIcons: [
        {id: 1, uri: 'https://randomuser.me/api/portraits/men/1.jpg'},
        {id: 2, uri: 'https://randomuser.me/api/portraits/women/2.jpg'},
        {id: 3, uri: 'https://randomuser.me/api/portraits/men/3.jpg'},
      ],
      userCount: 345,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      roomName: 'Tech Talk',
      dateTime: '2024-09-28 3:00 PM',
      shortDesc: 'Chat about the latest in tech.Chat about the latest in tech.',
      userIcons: [
        {id: 1, uri: 'https://randomuser.me/api/portraits/women/4.jpg'},
        {id: 2, uri: 'https://randomuser.me/api/portraits/men/5.jpg'},
        {id: 3, uri: 'https://randomuser.me/api/portraits/women/6.jpg'},
      ],
      userCount: 475,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      roomName: 'Movie Buffs',
      dateTime: '2024-09-29 6:00 PM',
      shortDesc:
        'Discuss the latest movies and reviews.Chat about the latest in tech.',
      userIcons: [
        {id: 1, uri: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {id: 2, uri: 'https://randomuser.me/api/portraits/women/8.jpg'},
        {id: 3, uri: 'https://randomuser.me/api/portraits/men/9.jpg'},
      ],
      userCount: 296,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      roomName: 'Movie Buffs',
      dateTime: '2024-09-29 6:00 PM',
      shortDesc:
        'Discuss the latest movies and reviews.Chat about the latest in tech.',
      userIcons: [
        {id: 1, uri: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {id: 2, uri: 'https://randomuser.me/api/portraits/women/8.jpg'},
        {id: 3, uri: 'https://randomuser.me/api/portraits/men/9.jpg'},
      ],
      userCount: 296,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      roomName: 'Movie Buffs',
      dateTime: '2024-09-29 6:00 PM',
      shortDesc:
        'Discuss the latest movies and reviews.Chat about the latest in tech.',
      userIcons: [
        {id: 1, uri: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {id: 2, uri: 'https://randomuser.me/api/portraits/women/8.jpg'},
        {id: 3, uri: 'https://randomuser.me/api/portraits/men/9.jpg'},
      ],
      userCount: 296,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      roomName: 'Movie Buffs',
      dateTime: '2024-09-29 6:00 PM',
      shortDesc:
        'Discuss the latest movies and reviews.Chat about the latest in tech.',
      userIcons: [
        {id: 1, uri: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {id: 2, uri: 'https://randomuser.me/api/portraits/women/8.jpg'},
        {id: 3, uri: 'https://randomuser.me/api/portraits/men/9.jpg'},
      ],
      userCount: 296,
    },
  ];

  const formatDate = dateTime => {
    return moment(dateTime, 'YYYY-MM-DD hh:mm A').format('D MMMM YYYY'); // Correctly parse and format the date
  };

  // Function to extract time from the dateTime
  const extractTime = dateTime => {
    return moment(dateTime, 'YYYY-MM-DD hh:mm A').format('h:mm A'); // Correctly parse and extract the time
  };

  const Item = ({item}) => (
    <View style={tw`bg-[#303649] p-4 rounded-lg w-43.5 m-2`}>
      <Text style={tw`text-white text-[20px] font-401 leading-normal mb-1`}>
        {item.roomName}
      </Text>

      {/* Date on one line, time on the next */}
      <Text style={tw`text-[#F5C451] text-[18px] font-400 leading-normal`}>
        {formatDate(item.dateTime)}
      </Text>
      <Text style={tw`text-[#F5C451] text-[18px] font-400 leading-normal mb-2`}>
        {extractTime(item.dateTime)}
      </Text>

      <Text style={tw`text-[#dbdbdb] text-[18px] font-400 leading-normal mb-2`}>
        {item.shortDesc}
      </Text>

      {/* User Icons */}
      <View style={tw`flex-row items-center mb-2`}>
        {item.userIcons.map((user, index) => (
          <View
            key={user.id}
            style={[
              tw`w-5 h-5 rounded-full overflow-hidden border-2 border-white`,
              {marginLeft: index > 0 ? -10 : 0},
            ]}>
            <Image
              source={{uri: user.uri}}
              style={[tw`w-full h-full`, {resizeMode: 'contain'}]}
            />
          </View>
        ))}
        <Text style={tw`text-white text-[16px] font-400 leading-normal ml-3`}>
          {`${item.userCount}+ active now`}
        </Text>
      </View>

      {/* Join Button */}
      {/* <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-lg`}>
        <Text style={tw`text-white text-center text-[16px] font-400 leading-normal`}>
          Join Room
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[
          tw`mt-1 rounded-lg justify-center `,
          {
            width: '100%',
            height: 40,
            alignSelf: 'center',
          },
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-lg justify-center , flex-row`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
            Join
          </Text>
          <AntDesign
            name={'arrowright'}
            size={20}
            color={'#fff'}
            style={tw`ml-2 self-center`}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="Rooms" />
      <FlatList
        numColumns={2}
        contentContainerStyle={tw`p-2`} // Added padding for equal spacing
        columnWrapperStyle={tw`justify-between`}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={tw` rounded-3xl absolute bottom-15 self-center flex-row justify-center`}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreateRooms')}>
        <Image
          source={require('../../assets/add.png')}
          style={[tw`w-15 h-15`, {resizeMode: 'contain'}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SpotLight;

const styles = StyleSheet.create({});
