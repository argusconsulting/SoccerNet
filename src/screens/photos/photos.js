import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getFanPhotos } from '../../redux/fanPhotosSlice';
import moment from 'moment';
import Loader from '../../components/loader/Loader';

const Photos = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch();
  const {fanPhotos,isLoading} = useSelector(state => state?.fanPhotos);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(getFanPhotos())
    });
    return willFocusSubscription;
  }, [dispatch]);

  const Item = ({item}) => (
    <View style={styles.item}>
      <ImageBackground
        source={{uri:item?.image}}
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
              source={{uri:item?.user?.avatar_url}}
              style={[tw`w-5 h-5 self-center rounded-full`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[16px] font-401 mx-1 mt-1 leading-tight self-center ml-3`}>
              {item?.user?.name}
            </Text>
          </View>
          <Text
            style={tw`text-[#A9A9A9] text-[14px] font-400 mx-1 mt-1 leading-tight`}>
           {moment(item?.created_at).format('MMMM Do YYYY, h:mm A')}
          </Text>
        </View>

        <Text
          style={tw`text-[#A9A9A9] text-[18px] font-400 mx-1 mt-1 leading-tight mt-2`}>
          {item?.caption}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Photos" />
      {isLoading ? <Loader/>:
      <>
        <FlatList
    data={fanPhotos}
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
  </TouchableOpacity></>}
    
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({});
