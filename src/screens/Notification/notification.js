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
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import tw from '../../styles/tailwind';
import TruncatedText from '../../components/truncatedText/truncatedText';
import {announcement, notificationMarkAsRead, notificationsHandler, notificationsMarkAllAsRead} from '../../redux/announcementSlice';
import Header from '../../components/header/header';
import Loader from '../../components/loader/Loader';
import moment from 'moment';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); // Track the current page
  const pageSize = 10; // Number of items per page




  const notificationsData = useSelector(state => state?.announcement?.notificationsList);
  const isLoading = useSelector(state => state.announcement.isLoading);

 
  useEffect(() => {
    dispatch(announcement());
   
  }, []);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchNotifications(1); 
    });
    return willFocusSubscription;
  }, []);

  const fetchNotifications = pageNumber => {
    dispatch(notificationsHandler(pageNumber))
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage); // Update current page
      fetchNotifications(newPage); // Fetch new data
    }
  };




  const totalPages = Math.ceil((notificationsData?.meta?.total || 0) / pageSize);


  const renderPagination = () => {
    if (!totalPages) return null; // If no pages, don't render
  
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <>
        <View style={tw`self-center justify-center h-11`} >
        <FlatList
          data={pages}
          horizontal
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePageChange(item)}
              style={[
                tw`px-4 py-2 m-1 rounded`,
                item === page ? tw`bg-blue-500` : tw`bg-gray-500`,
              ]}
            >
              <Text style={tw`text-white`}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
      </>
    );
  };

  const handleMarkAsRead = (id) => {
    dispatch(notificationMarkAsRead(id));
        console.log('Mark As Read API called');
      };

  const Item = ({item}) => (
    <View style={tw`mx-2 my-3 bg-[#303649] p-3 rounded-lg`}>
  
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
       </View>
  );
  return (
    <SafeAreaView style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Notifications" />
      <TouchableOpacity onPress={()=> dispatch(notificationsMarkAllAsRead())} style={tw`bg-[#fff] rounded-md w-25 h-8 text-center self-end mr-5 justify-center`}>
      <Text
              style={tw`text-[#000] text-[14px] font-401 leading-tight self-center`}>
           Mark as read
            </Text>
      </TouchableOpacity>
      <ScrollView>
    

      <View style={tw`mt-3 mx-3`}>
          {isLoading ? (
            <Loader />
          ) : notificationsData?.data?.length > 0 ? (
            <FlatList
              data={notificationsData?.data}
              renderItem={({item}) => <Item item={item} />}
              keyExtractor={item => item.id}
             
            />
          ) : (
            <Text>No Data Available!</Text>
          )}
        </View>

        <View style={tw`mt-4`}>
        {renderPagination()}
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
