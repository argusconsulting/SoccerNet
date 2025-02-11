import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import tw from '../../styles/tailwind';
import TruncatedText from '../../components/truncatedText/truncatedText';
import {
  announcement,
  notificationMarkAsRead,
  notificationsHandler,
  notificationsMarkAllAsRead,
} from '../../redux/announcementSlice';
import Header from '../../components/header/header';
import Loader from '../../components/loader/Loader';
import moment from 'moment';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); // Track the current page
  const [activeTab, setActiveTab] = useState('Notification'); // 'Notification' or 'Announcement'
  
  const pageSize = 10; // Number of items per page

  const announcementData = useSelector(
    state => state?.announcement?.announcementList,
  );
  const notificationsData = useSelector(
    state => state?.announcement?.notificationsList,
  );
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
    dispatch(notificationsHandler(pageNumber));
  };

  const handleMarkAsRead = id => {
    dispatch(notificationMarkAsRead(id));
  };

  const handlePageChange = newPage => {
    if (newPage !== page) {
      setPage(newPage);
      fetchNotifications(newPage);
    }
  };

  const totalPages = Math.ceil((notificationsData?.meta?.total || 0) / pageSize);

  const renderPagination = () => {
    if (!totalPages) return null; // If no pages, don't render

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <View style={tw`self-center justify-center h-11`}>
        <FlatList
          data={pages}
          horizontal
          keyExtractor={item => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePageChange(item)}
              style={[tw`px-4 py-2 m-1 rounded`, item === page ? tw`bg-blue-500` : tw`bg-gray-500`]}>
              <Text style={tw`text-white`}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const Item = ({ item }) => (
    <View style={tw`mx-2 my-3 bg-[#303649] p-3 rounded-lg`}>
      <View style={tw`flex-row`}>
        <Image
          source={item?.url ? { uri: item.url } : require('../../assets/no-pictures.png')}
          style={tw`w-7 h-7 rounded-lg border-[#3b3b3b] mt-1`}
        />
        <View>
          <Text style={[tw`text-[18px] text-[#fff] font-401 mx-5 mt-1 leading-tight`, { textTransform: 'capitalize' }]}>
            {item?.title}
          </Text>

          <Text style={[tw`text-[16px] text-[#fff] font-400 mx-5 mt-1 leading-tight w-70`, { textTransform: 'capitalize' }]}>
            {item?.body}
          </Text>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-[#fff] text-[12px] font-400 ml-5 mr-2 mt-1 leading-tight`}>
              {moment(item?.created_at).format('YYYY-MM-DD')} {'  '}
              {moment(item?.created_at).format('hh:mm A')}
            </Text>
            {/* <TouchableOpacity onPress={() => handleMarkAsRead(item?.id)}>
              <Text style={tw`text-[#72bf6a] text-[14px] font-400  mt-1 leading-tight `}>
                Mark as read
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );

  const AnnouncementItem = ({ item }) => (
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
          <Image
            source={item?.Image ? { uri: item?.Image } : require('../../assets/camera.png')}
            style={tw`w-15 h-15 rounded-lg`}
          />
          <View>
            <Text style={[tw`text-[18px] text-[#fff] font-401 mx-5 w-60 leading-tight`, { textTransform: 'capitalize' }]}>
              {item?.Title}
            </Text>

            <Text style={[tw`text-[14px] text-[#fff] font-400 mx-5 w-60 leading-tight`, { textTransform: 'capitalize' }]}>
              {item?.Description}
            </Text>
            {/* <TruncatedText text={item?.Description} ellipsis=" (see more)" /> */}
            <View style={tw`flex-row`}>
              <Text style={tw`text-[#fff] text-[12px] font-400 ml-5 mr-2 mt-1 leading-tight `}>
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
    <SafeAreaView style={tw`bg-[#05102E] flex-1`}>
      <Header />

      {/* Tabs Navigation */}
      <View style={tw`flex-row justify-between mx-5 mt-1`}>
        <TouchableOpacity onPress={() => setActiveTab('Notification')} style={tw`flex-1`}>
          <Text style={[tw`text-center py-2 text-lg`, activeTab === 'Notification' ? tw`text-white border-b-2 border-blue-500` : tw`text-gray-400`]}>
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('Announcement')} style={tw`flex-1`}>
          <Text style={[tw`text-center py-2 text-lg`, activeTab === 'Announcement' ? tw`text-white border-b-2 border-blue-500` : tw`text-gray-400`]}>
            Announcements
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'Notification' ? (
          <View style={tw`mt-3 mx-3`}>
            <TouchableOpacity
        onPress={() => dispatch(notificationsMarkAllAsRead())}
        style={tw `bg-[#fff] rounded-md px-2 h-8 text-center self-end mr-3 justify-center`}>
        <Text
          style={tw`text-[#000] text-[14px] font-401 leading-tight self-center`}>
          Mark all as read
        </Text>
      </TouchableOpacity>
            {isLoading ? (
              <Loader />
            ) : notificationsData?.data?.length > 0 ? (
              <FlatList data={notificationsData?.data} renderItem={({ item }) => <Item item={item} />} keyExtractor={item => item.id} />
            ) : (
              <Text>No Data Available!</Text>
            )}
            <View style={tw`mt-4`}>{renderPagination()}</View>
          </View>
        ) : (
          <View style={tw`mx-3 mt-3`}>
            {announcementData?.length > 0 ? (
              <FlatList data={announcementData} renderItem={({ item }) => <AnnouncementItem item={item} />} keyExtractor={item => item.id} />
            ) : (
              <Loader />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
