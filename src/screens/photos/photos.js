import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getFanReactions, getFanPhotos} from '../../redux/fanPhotosSlice';
import moment from 'moment';
import Loader from '../../components/loader/Loader';

const Photos = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {fanPhotos, isLoading} = useSelector(state => state?.fanPhotos);

  const [localPhotos, setLocalPhotos] = useState([]);

  // Initialize local photos when fanPhotos updates
  useEffect(() => {
    if (fanPhotos) {
      const updatedPhotos = fanPhotos.map(photo => ({
        ...photo,
        is_reacted: photo.is_reacted || null, // Ensure it has a default value
      }));
      setLocalPhotos(updatedPhotos);
    }
  }, [fanPhotos]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(getFanPhotos());
    });
    return willFocusSubscription;
  }, [dispatch]);

  const handleReaction = (reaction, postId) => {
    const updatedPhotos = localPhotos.map(photo => {
      if (photo.id === postId) {
        return {
          ...photo,
          is_reacted: reaction, // Set the reaction
          claps_count: reaction === 'clap' ? 1 : 0,
          likes_count: reaction === 'like' ? 1 : 0,
          hearts_count: reaction === 'heart' ? 1 : 0,
        };
      }
      return photo;
    });

    setLocalPhotos(updatedPhotos);

    const reqData = {id: postId, reaction};
    dispatch(getFanReactions(reqData)).catch(() => {
      setLocalPhotos(fanPhotos); // Rollback on failure
    });
  };

  const renderItem = ({item}) => (
    <View style={tw`mt-5`}>
      <ImageBackground
        source={{uri: item?.image}}
        style={[tw`w-full h-120`, {resizeMode: 'cover'}]}>
        <View style={tw`absolute bottom-0 right-0 flex-row p-2`}>
          <TouchableOpacity onPress={() => handleReaction('clap', item.id)}>
            {console.log('value of item', item)}
            <FontAwesome6
              name={'hands-clapping'}
              size={20}
              color={item.is_reacted === 'clap' ? '#FFBF00' : '#fff'}
              style={tw`self-center`}
            />
            <Text style={tw`text-[#fff] text-[16px] mx-1`}>
              {item.claps_count} claps
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReaction('like', item.id)}>
            <FontAwesome
              name={item.is_reacted === 'like' ? 'thumbs-up' : 'thumbs-o-up'}
              size={20}
              color={item.is_reacted === 'like' ? '#FFBF00' : '#fff'}
              style={tw`self-center`}
            />
            <Text style={tw`text-[#fff] text-[16px] mx-1`}>
              {item.likes_count} likes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReaction('heart', item.id)}>
            <AntDesign
              name={item.is_reacted === 'heart' ? 'heart' : 'hearto'}
              size={20}
              color={item.is_reacted === 'heart' ? 'red' : '#fff'}
              style={tw`self-center`}
            />
            <Text style={tw`text-[#fff] text-[16px] mx-1`}>
              {item.hearts_count} hearts
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={tw`p-3`}>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex-row`}>
            <Image
              source={{uri: item?.user?.avatar_url}}
              style={[tw`w-5 h-5 rounded-full`]}
            />
            <Text style={tw`text-[#fff] text-[16px] mx-3`}>
              {item?.user?.name}
            </Text>
          </View>
          <Text style={tw`text-[#A9A9A9] text-[14px]`}>
            {moment(item?.created_at).format('MMMM Do YYYY, h:mm A')}
          </Text>
        </View>

        <Text style={tw`text-[#A9A9A9] text-[18px] mt-2`}>{item?.caption}</Text>
      </View>
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="Photos" />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={localPhotos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 60}}
          ListEmptyComponent={
            <Text style={tw`text-[#fff] text-center mt-10`}>
              No photos available
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={tw`w-70 h-10 bg-[#303649] rounded-3xl absolute bottom-5 self-center flex-row justify-center`}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('UploadPhotos')}>
        <AntDesign
          name={'camera'}
          size={20}
          color={'#fff'}
          style={tw`mr-1 self-center`}
        />
        <Text style={tw`text-[#fff] text-[16px] self-center`}>
          Upload your match moments
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Photos;
