import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import tw from '../../styles/tailwind';
import TruncatedText from '../../components/truncatedText/truncatedText';
import {announcement} from '../../redux/announcementSlice';
import Header from '../../components/header/header';
import Loader from '../../components/loader/Loader';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const announcementData = useSelector(
    state => state?.announcement?.announcementList,
  );

  useEffect(() => {
    dispatch(announcement());
  }, []);

  const Item = ({item}) => (
    <View style={tw`mx-2 my-3 bg-[#303649] p-3 rounded-lg`}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AnnouncementDetail', {
            announcementName: item?.Title,
            image: item?.Image,
            desc: item?.Description,
            date: item?.Schedule_at,
          })
        }>
        <View style={tw`flex-row`}>
          {item?.Image == null || item?.Image == ' ' ? (
            <Image
              source={require('../../assets/camera.png')}
              style={tw`w-15 h-15 rounded-lg`}
            />
          ) : (
            <Image
              source={{uri: item?.Image}}
              style={tw`w-15 h-15 rounded-lg`}
            />
          )}

          <View>
            <Text
              style={[
                tw`text-[18px] text-[#fff] font-401 mx-5 mt-1 leading-tight`,
                {textTransform: 'capitalize'},
              ]}>
              {item?.Title}
            </Text>

            <TruncatedText text={item?.Description} ellipsis=" (see more)" />
            <View style={tw`flex-row`}>
              <Text
                style={tw`text-[#fff] text-[12px] font-400 ml-5 mr-2 mt-1 leading-tight `}>
                {item?.Schedule_at?.split?.(' ')[0]} {'  '}
                {item?.Schedule_at?.split?.(' ')[1]}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Notifications" />
      <ScrollView>
      <View style={tw`mx-3 mt-3 `}>
        {announcementData?.length > 0 ? (
          <FlatList
            data={announcementData}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <Loader />
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  elevation: {
    elevation: 5,
    shadowColor: '#7d7d7d',
  },
});
