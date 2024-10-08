import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import tw from '../../styles/tailwind';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/search-bar/search-bar';
import ScoreCard from '../../components/score-card/score-card';
import { matches } from '../../helpers/dummyData';
import { useNavigation } from '@react-navigation/native';
import Menu from '../../components/menu/menu';

const Home = () => {

  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const items = [
    {
      id: '3ac68afc-c605-48d3-a4f8-fb1aa97f63',
      flag: require('../../assets/league_icons/league-1.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      flag: require('../../assets/league_icons/league-2.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d756',
      flag: require('../../assets/league_icons/league-3.png'),
    },
    {
      id: '3ac8afc-c605-48d3-a4f8-fb1aa97f63',
      flag: require('../../assets/league_icons/league-1.png'),
    },
    {
      id: '3ac68fc-c605-48d3-a4f8-fbd91aa97f63',
      flag: require('../../assets/league_icons/league-2.png'),
    },
    {
      id: '58694a0-3da1-471f-bd96-145571e29d756',
      flag: require('../../assets/league_icons/league-3.png'),
    },
  ];



  const Item = ({item}) => (
    <View style={tw`bg-[#303649] p-3 mx-2 rounded-lg`}>
      <Image
        source={item?.flag}
        style={[tw`w-11 h-11 self-center`, {resizeMode: 'contain'}]}
      />
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <View style={tw`flex-row justify-between p-5`}>
        <TouchableOpacity    onPress={() => setModalVisible(true)}
              activeOpacity={0.4}>
        <Entypo name={'menu'} color={'#fff'} size={26} style={tw``} />
        </TouchableOpacity>

        <TouchableOpacity    onPress={() => navigation.navigate('Notification')}
              activeOpacity={0.4}>
        <Ionicons
          name={'notifications'}
          color={'#fff'}
          size={26}
          style={tw``}
        />
        </TouchableOpacity>
      </View>
      <View style={tw`px-5`}>
        <Text
          style={tw`text-white text-[22px] font-401 leading-tight  mt-3 mb-5 `}>
          What's on your mind ?
        </Text>

        <SearchBar />
      </View>
      <View>
        <View style={tw`flex-row justify-between mb-5`}>
          <Text
            style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5`}>
            League
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('LeagueScreen')}>
          <Text
            style={tw`text-[#8195FF] text-[14px] font-401 leading-tight  mt-5  px-5`}>
            Sell all
          </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={tw`px-3`}
        />
      </View>

      <View>
        <View style={tw`flex-row justify-between mt-3 mb-2`}>
          <Text
            style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5`}>
            Live Now
          </Text>
          <Text
            style={tw`text-[#8195FF] text-[14px] font-401 leading-tight  mt-5  px-5`}>
            Sell all
          </Text>
        </View>

        <FlatList
          data={matches}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <ScoreCard match={item} width={280} navigate={''}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`items-center px-3`}
        />
      </View>

      <View>
        <View style={tw`flex-row justify-between mt-3 mb-2`}>
          <Text
            style={tw`text-white text-[22px] font-401 leading-tight  mt-3 px-5`}>
            Just Finished
          </Text>
          <Text
            style={tw`text-[#8195FF] text-[14px] font-401 leading-tight  mt-5  px-5`}>
            Sell all
          </Text>
        </View>
        <FlatList
          data={matches}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <ScoreCard match={item}  width={280} navigate={''}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`items-center px-3`}
        />
      </View>

      <Menu modalVisible={modalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
