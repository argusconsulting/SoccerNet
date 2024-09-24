import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import tw from '../../styles/tailwind';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LeagueScreen = () => {
  const navigation = useNavigation();
  const [expandedItem, setExpandedItem] = useState(null);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      logo: require('../../assets/league_icons/league-1.png'),
      title: 'Premier League',
      details:{
        homeLogo: require('../../assets/league_icons/league-2.png'),
        awayLogo: require('../../assets/league_icons/league-1.png'),
        homeTitle: 'Premier League',
        awayTitle: 'Premier League',
        date:"1 August 2029"
      },
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      logo: require('../../assets/league_icons/league-1.png'),
      title: 'La Liga',
      details:{
        homeLogo: require('../../assets/league_icons/league-3.png'),
        awayLogo: require('../../assets/league_icons/league-2.png'),
        homeTitle: 'Premier League',
        awayTitle: 'Premier League',
        date:"1 August 2029"
      },
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      logo: require('../../assets/league_icons/league-1.png'),
      title: 'Serie A',
      details:{
        homeLogo: require('../../assets/league_icons/league-1.png'),
        awayLogo: require('../../assets/league_icons/league-3.png'),
        homeTitle: 'Premier League',
        awayTitle: 'Saudi League',
        date:"1 August 2029"
      },
    },
  ];

  const toggleItem = (id) => {
    setExpandedItem(prevState => (prevState === id ? null : id));
  };

  const Item = ({item}) => (
    <View style={tw`bg-[#303649] mb-5 p-3 rounded-lg`}>
      <TouchableOpacity 
        style={tw`flex-row justify-between`}
        onPress={() => toggleItem(item.id)}
      >
        <View style={tw`flex-row`}>
        <Image source={item?.logo} style={[tw`w-8 h-8 mr-5`,{resizeMode:"contain"}]}/>
        <Text style={styles.title}>{item.title}</Text>
        </View>
        <AntDesign
          name={expandedItem === item.id ? 'caretup' : 'caretdown'}
          size={15}
          color={'#fff'}
        />
      </TouchableOpacity>
      {expandedItem === item.id && (
        <>
          <View style={tw`flex-row mt-3 self-center`}>
          <Image source={item?.details?.homeLogo} style={[tw`w-5 h-5 mt-1 mr-1`,{resizeMode:"contain"}]}/>
          <Text style={tw`text-[#fff] text-[15px] font-400 leading-normal  mt-0.5`}>{item?.details?.homeTitle}</Text>
          <Text style={tw`text-[#fff] text-[16px] font-400 leading-normal mx-2`}>v/s</Text>
          <Image source={item?.details?.awayLogo} style={[tw`w-5 h-5 mt-1 mr-1`,{resizeMode:"contain"}]}/>
          <Text style={tw`text-[#fff] text-[15px] font-400 leading-normal mt-0.5`}>{item?.details?.awayTitle}</Text>
          </View>

<Text style={tw`text-[#a2a2a2] text-[15px] font-400 leading-normal  mt-2 self-center`}>{item?.details?.date}</Text>
</>
      )}
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] h-full p-5`}>
      <View style={tw`flex-row mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'arrowleft'}
            size={24}
            color={'#fff'}
            style={tw`mt-2`}
          />
        </TouchableOpacity>
        <Text style={tw`text-[#fff] text-[26px] font-401 leading-normal mx-5`}>League</Text>
      </View>

      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LeagueScreen;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
