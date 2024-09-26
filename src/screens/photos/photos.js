import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const Photos = () => {

  const navigation = useNavigation()
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Harry Brook',
      duration: '3 hours ago',
      img: require('../../assets/img1.png'),
      profile: require('../../assets/profile.png'),
      desc: 'Caught this moment!',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Harry Brook',
      img: require('../../assets/img2.png'),
      duration: '3 hours ago',
      profile: require('../../assets/profile.png'),

      desc: 'Caught this moment!',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Harry Brook',
      img: require('../../assets/img1.png'),
      duration: '3 hours ago',
      profile: require('../../assets/profile.png'),

      desc: 'Caught this moment!',
    },
  ];

  const Item = ({item}) => (
    <View style={styles.item}>
      <ImageBackground
        source={item?.img}
        style={[tw`w-full h-120`, {resizeMode: 'cover'}]}>
        <View
          style={[
            tw`absolute bottom-0 right-0 flex-row p-2`,
            {alignItems: 'center'},
          ]}>
          <View>
            <FontAwesome6
              name={'hands-clapping'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
            <Text
              style={tw`text-[#fff] text-[16px] font-401 mx-1 mt-1 leading-tight self-center `}>
              12 claps
            </Text>
          </View>

          <View>
            <FontAwesome6
              name={'thumbs-up'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
            <Text
              style={tw`text-[#fff] text-[16px] font-401 mx-1 mt-1 leading-tight self-center `}>
              12 likes
            </Text>
          </View>

          <View>
            <AntDesign
              name={'hearto'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
            <Text
              style={tw`text-[#fff] text-[16px] font-401 mx-1 mt-1 leading-tight self-center `}>
              12 hearts
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={tw`p-3`}>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex-row `}>
            <Image
              source={item?.profile}
              style={[tw`w-5 h-5 self-center`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[16px] font-401 mx-1 mt-1 leading-tight self-center ml-3`}>
              {item?.name}
            </Text>
          </View>
          <Text
            style={tw`text-[#A9A9A9] text-[14px] font-400 mx-1 mt-1 leading-tight`}>
            {item?.duration}
          </Text>
        </View>

        <Text
          style={tw`text-[#A9A9A9] text-[18px] font-400 mx-1 mt-1 leading-tight mt-2`}>
          {item?.desc}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Photos" />
      <FlatList
    data={DATA}
    renderItem={({item}) => <Item item={item} />}
    keyExtractor={item => item.id}
    contentContainerStyle={{ paddingBottom: 60 }} // To avoid content hiding behind the button
  />

  <TouchableOpacity 
    style={tw`w-70 h-10 bg-[#303649] rounded-3xl absolute bottom-5  self-center justify-center flex-row`}
    activeOpacity={0.8}
    onPress={()=> navigation.navigate('UploadPhotos')}
  >
      <AntDesign
              name={'camera'}
              size={20}
              color={'#fff'}
              style={tw`self-center mr-1`}
            />
    <Text style={tw`text-[#fff] text-[16px] font-400 mx-1 leading-tight  self-center`}>
      Upload your match moments
    </Text>
  </TouchableOpacity>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({});
