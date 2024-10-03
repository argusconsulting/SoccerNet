import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';

const News = ({ shownHeader = true }) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      leagueName: 'PREMIER LEAGUE',
      title:
        'Liverpool is still in the mix, but the challenge is that Al-Hilal’s offer is very tempting for Bayern',
      img: require('../../assets/news1.png'),
      desc: 'The future of Kingsley Coman will be determined this week as a report suggests that the player wants to depart Bayern Munich...',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      leagueName: 'PREMIER LEAGUE',
      title:
        'Liverpool is still in the mix, but the challenge is that Al-Hilal’s offer is very tempting for Bayern',
      img: require('../../assets/news2.png'),
      desc: 'The future of Kingsley Coman will be determined this week as a report suggests that the player wants to depart Bayern Munich...',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      leagueName: 'PREMIER LEAGUE',

      title:
        'Liverpool is still in the mix, but the challenge is that Al-Hilal’s offer is very tempting for Bayern',
      img: require('../../assets/news1.png'),
      desc: 'The future of Kingsley Coman will be determined this week as a report suggests that the player wants to depart Bayern Munich...',
    },
  ];

  const Item = ({item}) => (
    <View style={styles.item}>
      <Image
        source={item?.img}
        style={[tw`w-full h-60 `, {resizeMode: 'contain'}]}
      />
      <View style={tw`p-3`}>
        <Text
          style={tw`text-[#F5C451] text-[16px] font-401 mx-1 mt-1 leading-tight`}>
          {item?.leagueName}
        </Text>
        <Text
          style={tw`text-[#fff] text-[20px] font-401 mx-1 mt-1 leading-tight`}>
          {item?.title}
        </Text>
        <Text
          style={tw`text-[#A9A9A9] text-[18px] font-400 mx-1 mt-1 leading-tight`}>
          {item?.desc}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      
      {shownHeader && <Header name="News" />}

      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({});
