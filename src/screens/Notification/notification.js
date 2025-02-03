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
import {announcement, notificationMarkAsRead, notificationsHandler} from '../../redux/announcementSlice';
import Header from '../../components/header/header';
import Loader from '../../components/loader/Loader';
import moment from 'moment';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const notificationsData = useSelector(state => state?.announcement?.notificationsList);

  useEffect(() => {
    dispatch(announcement());
    dispatch(notificationsHandler());
  }, []);

  const handleMarkAsRead = (id) => {
    dispatch(notificationMarkAsRead(id));
        console.log('Mark As Read API called');
      };

  const Item = ({item}) => (
    <View style={tw`mx-2 my-3 bg-[#303649] p-3 rounded-lg`}>
      <TouchableOpacity
       >
        <View style={tw`flex-row`}>
        <Image
            source={
              item?.url
                ? {uri: item.url}
                : require('../../assets/no-pictures.png')
            }
            style={tw`w-7 h-7 rounded-lg border-[#3b3b3b] mt-1`}
          />

          <View>
            <Text
              style={[
                tw`text-[18px] text-[#fff] font-401 mx-5 mt-1 leading-tight`,
                {textTransform: 'capitalize'},
              ]}>
              {item?.title}
            </Text>

            <Text
              style={[
                tw`text-[16px] text-[#fff] font-400 mx-5 mt-1 leading-tight`,
                {textTransform: 'capitalize'},
              ]}>
              {item?.body}
            </Text>
            <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-[#fff] text-[12px] font-400 ml-5 mr-2 mt-1 leading-tight`}>
  {moment(item?.created_at).format('YYYY-MM-DD')} {'  '}
  {moment(item?.created_at).format('hh:mm A')} 
</Text>
<TouchableOpacity onPress={()=> handleMarkAsRead(item?.id)}>
            <Text
              style={tw`text-[#72bf6a] text-[14px] font-400 mr-10 mt-1 leading-tight `}>
           Mark as read
            </Text>
            </TouchableOpacity>
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
        {notificationsData?.length > 0 ? (
          <FlatList
            data={notificationsData}
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
