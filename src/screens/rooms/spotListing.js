import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import moment from 'moment'; // You can use this library for date formatting
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox} from 'react-native-paper';
import debounce from 'lodash/debounce';
import Modal from 'react-native-modal';
import {
  filter,
  getFilterData,
  getMeetingRooms,
  joinMeetingRooms,
  leaveMeetingRooms,
} from '../../redux/fanSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from '../../components/search-bar/search-bar';
import {searchHandler, setSearchData} from '../../redux/searchSlice';
import Loader from '../../components/loader/Loader';

const SpotLight = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.room?.isLoading);
  const data = useSelector(state => state.room?.roomData);
  const filterData = useSelector(state => state.room?.filterData);
  // const filteredRoomData = useSelector(state => state.room?.filter);
  const userId = useSelector(state => state.auth_store.userID);
  const searchedData = useSelector(state => state?.search.searchData);
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxPress = id => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        // If already selected, remove it
        return prevSelectedIds.filter(item => item !== id);
      } else {
        // If not selected, add it
        return [...prevSelectedIds, id];
      }
    });
  };

  const toggleModal = () => {
    dispatch(getFilterData());
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(getMeetingRooms());
    });
    return willFocusSubscription;
  }, [dispatch]);

  const debouncedSearch = useCallback(
    debounce(query => {
      if (query) {
        dispatch(searchHandler(query));
      } else {
        dispatch(setSearchData());
        dispatch(getMeetingRooms());
      }
    }, 500), // Adjust delay (in milliseconds) as per your requirements
    [dispatch],
  );

  // Handle search input
  const handleSearch = query => {
    debouncedSearch(query);
  };

  const formatDate = dateTime => {
    return moment(dateTime, 'YYYY-MM-DD hh:mm A').format('D MMMM YYYY');
  };

  const Item = ({item}) => {
    const isJoined = item.users.some(user => user.id === userId);

    const handlePress = groupId => {
      if (isJoined) {
        dispatch(leaveMeetingRooms({userId, groupId})).then(() => {
          dispatch(getMeetingRooms());
        });
      } else {
        dispatch(joinMeetingRooms({userId, groupId})).then(() =>
          navigation.navigate('MeetingChat', {groupId: groupId}),
        );
      }
    };

    const onCardClick = ({groupId, groupName}) => {
      if (isJoined) {
        navigation.navigate('MeetingChat', {
          groupId: groupId,
          groupName: groupName,
        });
      }
    };

    return (
      <TouchableOpacity
        style={tw`bg-[#303649] p-4 rounded-lg w-43.5 m-2`}
        onPress={() => onCardClick({groupId: item?.id, groupName: item?.name})}>
        <View style={tw`flex-row justify-between`}>
          <Text
            style={[
              tw`text-white text-[20px] font-401 leading-normal mb-1`,
              {textTransform: 'capitalize'},
            ]}>
            {item.name}
          </Text>
          <TouchableOpacity style={tw`self-center`}>
            <Entypo name={'dots-three-vertical'} size={18} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-[#F5C451] text-[18px] font-400 leading-normal`}>
          {formatDate(item.schedule_start)}
        </Text>
        <Text
          style={tw`text-[#dbdbdb] text-[18px] font-400 leading-normal mb-2`}>
          {item?.description}
        </Text>
        <View style={tw`flex-row items-center mb-2`}>
          {item.users.map((user, index) => (
            <View
              key={user.id}
              style={[
                tw`w-5 h-5 rounded-full overflow-hidden border-2 border-white`,
                {marginLeft: index > 0 ? -10 : 0},
              ]}>
              <Image
                source={{uri: user.formatted_avatar_url}}
                style={[tw`w-full h-full`, {resizeMode: 'contain'}]}
              />
            </View>
          ))}
          {item.users.length > 0 && (
            <Text
              style={tw`text-white text-[16px] font-400 leading-normal ml-3`}>
              {`${item.users.length} active now`}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handlePress(item?.id)}
          style={[
            tw`mt-1 rounded-lg justify-center`,
            {width: '100%', height: 40, alignSelf: 'center'},
          ]}>
          <LinearGradient
            colors={['#6A36CE', '#2575F6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              tw`rounded-lg justify-center flex-row`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
              {isJoined ? 'Leave' : 'Join'}
            </Text>
            <AntDesign
              name={isJoined ? 'arrowleft' : 'arrowright'}
              size={20}
              color={'#fff'}
              style={tw`ml-2 self-center`}
            />
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const onSubmitHandler = () => {
    dispatch(filter(selectedIds));
  };
  const displayedData = searchedData?.length > 0 ? searchedData : data;

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="Rooms" />
      <View style={tw`px-5`}>
        <SearchBar onSearch={handleSearch} />

        <TouchableOpacity
          style={tw`justify-end flex-row`}
          onPress={toggleModal}>
          <Text style={tw`text-white text-center text-[16px] mr-2font-400`}>
            Filter
          </Text>
          <AntDesign name={'filter'} size={18} color={'#fff'} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader />
      ) : displayedData?.length > 0 ? (
        <FlatList
          numColumns={2}
          contentContainerStyle={tw`p-1`}
          columnWrapperStyle={tw`justify-between`}
          showsHorizontalScrollIndicator={false}
          data={displayedData}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={tw`text-white text-center mt-10 text-[16px] font-400`}>
          No results found.
        </Text>
      )}
      <TouchableOpacity
        style={tw` rounded-3xl absolute bottom-15 self-center flex-row justify-center`}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreateRooms')}>
        <Image
          source={require('../../assets/add.png')}
          style={[tw`w-15 h-15`, {resizeMode: 'contain'}]}
        />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={tw` bg-[#B2BEB5] w-full h-[60%] rounded-lg`}>
          <View style={tw`flex-row justify-between`}>
            <Text
              style={tw`text-[#000] text-[24px] m-5 font-401 leading-tight`}>
              Filter
            </Text>
            <TouchableOpacity
              style={tw`self-center mr-5`}
              onPress={toggleModal}>
              <AntDesign name={'close'} size={20} color={'#000'} />
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loader />
          ) : (
            filterData.map(e => {
              return (
                <View style={tw`flex-row mx-3 mt-3 `} key={e.id}>
                  <Checkbox
                    status={
                      selectedIds.includes(e.id) ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleCheckboxPress(e.id)}
                  />
                  <Text
                    style={tw`text-[#000] text-[22px] mt-1 font-401 leading-tight`}>
                    {e?.name}
                  </Text>
                </View>
              );
            })
          )}

          <TouchableOpacity
            onPress={() => onSubmitHandler()}
            style={[
              tw`mt-15 mx-2 rounded-md justify-center self-center`,
              {
                width: '90%',
                height: 50,
              },
            ]}>
            <LinearGradient
              colors={['#6A36CE', '#2575F6']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[
                tw`rounded-xl justify-center`,
                {flex: 1, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SpotLight;
