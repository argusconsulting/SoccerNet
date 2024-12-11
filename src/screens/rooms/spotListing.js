import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
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
  filterHandler,
  getFilterData,
  getMeetingRooms,
  inActiveRoomHandler,
  joinMeetingRooms,
  leaveMeetingRooms,
  setFilterResData,
} from '../../redux/fanSlice';
import SearchBar from '../../components/search-bar/search-bar';
import {searchHandler, setSearchData} from '../../redux/searchSlice';
import Loader from '../../components/loader/Loader';
import Entypo from 'react-native-vector-icons/Entypo';
import {getProfileData} from '../../redux/profileSlice';

const SpotLight = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.room?.isLoading);
  const data = useSelector(state => state.room?.roomData);
  const filterData = useSelector(state => state.room?.filterData);
  const final = useSelector(state => state.room?.filterRes);
  const userId = useSelector(state => state.auth_store.userID);
  const searchedData = useSelector(state => state?.search.searchData);
  const userProfileData = useSelector(state => state.profile.userProfileData);
  const screenWidth = Dimensions.get('window').width;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isProfileCheckModal, setProfileCheckModal] = useState(false);
  const filteredRoomData = final?.data?.groups;

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
    setModalVisible(true);
  };

  useEffect(() => {
    // Check if userProfileData.country is empty or undefined
    if (!userProfileData?.country) {
      setProfileCheckModal(true);
    } else {
      setProfileCheckModal(false);
    }
  }, [userProfileData]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(getMeetingRooms());
      dispatch(getProfileData());
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

  const createTwoButtonAlert = (groupId, isActive) =>
    Alert.alert(
      'Change Room Status',
      `Are you sure you want to mark this room as ${
        isActive ? 'inactive' : 'active'
      }?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            setTimeout(() => {
              dispatch(inActiveRoomHandler({status: !isActive, groupId}));
            }, 2000);
          },
        },
      ],
    );

  const Item = ({item}) => {
    const isJoined = item.users.some(user => user.id === userId);

    const handlePress = (groupId, groupName) => {
      if (isJoined) {
        dispatch(leaveMeetingRooms({userId, groupId})).then(() => {
          dispatch(getMeetingRooms());
        });
      } else {
        dispatch(joinMeetingRooms({userId, groupId})).then(() =>
          navigation.navigate('MeetingChat', {
            groupId: groupId,
            groupName: groupName,
          }),
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
  style={[
    item?.is_active === false
      ? tw`bg-[#545454] p-4 rounded-lg  m-2`
      : tw`bg-[#303649] p-4 rounded-lg  m-2`,
    {  width: screenWidth  /2 - 20 , flexDirection: 'column', justifyContent: 'space-between', minHeight: 180 }, // Add flex and minHeight
  ]}
  disabled={item?.is_active === false}
  onPress={() => onCardClick({ groupId: item?.id, groupName: item?.name })}>
  
  <View style={tw`flex-row justify-between`}>
    <Text
      style={[
        tw`text-white text-[20px] font-401 leading-normal mb-1 w-30 h-15`,
        { textTransform: 'capitalize' },
      ]}>
      {item.name}
    </Text>
    <TouchableOpacity onPress={() => createTwoButtonAlert(item?.id, item?.is_active)}>
      <Entypo
        name={'dots-three-vertical'}
        size={18}
        color={'#fff'}
        style={tw`ml-3 self-center mt-2`}
      />
    </TouchableOpacity>
  </View>

  <Text style={tw`text-[#F5C451] text-[18px] font-400 leading-normal`}>
    {formatDate(item.schedule_start)}
  </Text>
  <Text style={tw`text-[#dbdbdb] text-[18px] font-400 leading-normal mb-2`}>
    {item?.description}
  </Text>
  <View style={tw`flex-row items-center mb-2`}>
    {item.users.map((user, index) => (
      <View
        key={user.id}
        style={[
          tw`w-5 h-5 rounded-full overflow-hidden border-2 border-white`,
          { marginLeft: index > 0 ? -10 : 0 },
        ]}>
        <Image
          source={{ uri: user.formatted_avatar_url }}
          style={[tw`w-full h-full`, { resizeMode: 'contain' }]}
        />
      </View>
    ))}
    {item.users.length > 0 && (
      <Text style={tw`text-white text-[16px] font-400 leading-normal ml-3`}>
        {`${item.users.length} active now`}
      </Text>
    )}
  </View>

  {/* Fixed button at the bottom */}
  <TouchableOpacity
    disabled={item?.is_active === false}
    onPress={() => handlePress(item?.id, item?.name)}
    style={[
      tw`mt-1 rounded-lg justify-center`,  // Remove bottom-0 and absolute
      { width: '100%', height: 40, alignSelf: 'center' },
    ]}>
    <LinearGradient
      colors={['#6A36CE', '#2575F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        tw`rounded-lg justify-center flex-row`,
        { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    dispatch(filterHandler(selectedIds));
    setModalVisible(false);
  };

  const displayedData =
    final?.data && filteredRoomData?.length > 0 // Check if filtered data exists
      ? filteredRoomData
      : searchedData?.length > 0 // Check if search data exists
      ? searchedData
      : !final?.data // Check if no filters are applied
      ? data
      : [];


  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="Rooms" />
      <View style={tw`px-5`}>
        <SearchBar onSearch={handleSearch} placeholderText={'Search by room names...'} />

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
      ) : displayedData?.length > 0 ? ( // If there's data to display
        <FlatList
          numColumns={2}
          contentContainerStyle={tw`p-1`}
          columnWrapperStyle={tw`justify-between`}
          showsHorizontalScrollIndicator={false}
          data={displayedData}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      ) : final?.data ? ( // Filters applied but no data found
        <Text
          style={tw`text-[#fff] text-[20px] mt-15 mr-3 font-401 leading-tight self-center`}>
          No results found.
        </Text>
      ) : (
        <Text
          style={tw`text-[#fff] text-[20px] mt-15 mr-3 font-401 leading-tight self-center`}>
          No data available.
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
        <View style={tw`bg-[#B2BEB5] w-full h-[50%] rounded-lg`}>
          <View style={tw`flex-row justify-between`}>
            <Text
              style={tw`text-[#000] text-[24px] m-5 font-401 leading-tight`}>
              Filter
            </Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setFilterResData());
                  setModalVisible(false);
                }}>
                <Text
                  style={tw`text-blue-500 text-[20px] mt-5 mr-3 font-401 leading-tight`}>
                  Clear Filters
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`self-center mr-5`}
                onPress={() => setModalVisible(false)}>
                <AntDesign name={'close'} size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
          {loading ? (
            <Loader />
          ) : filterData && filterData.length > 0 ? (
            <FlatList
              data={filterData}
              numColumns={2} // Ensure two items per row
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={tw`w-[45%] mx-3 mt-3 flex-row items-center`}>
                  <Checkbox
                    status={
                      selectedIds.includes(item.id) ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleCheckboxPress(item.id)}
                  />
                  <Text
                    style={tw`text-[#000] text-[22px] ml-2 font-401 leading-tight`}>
                    {item?.name}
                  </Text>
                </View>
              )}
              columnWrapperStyle={tw`justify-between`} // Ensures spacing between columns
            />
          ) : (
            <Text style={tw`text-[#000] text-[18px] mt-10 text-center`}>
              No data available.
            </Text>
          )}

          <TouchableOpacity
            onPress={() => onSubmitHandler()}
            style={[
              tw`my-5 mx-2 rounded-md justify-center self-center`,
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

      {loading ? (
        <View></View>
      ) : (
        <Modal isVisible={isProfileCheckModal}>
          <View style={tw`bg-[#F9F9F9] w-[90%] rounded-lg self-center`}>
            {/* Add an image or GIF */}
            <Image
              source={{uri: 'https://i.gifer.com/7efs.gif'}} // Replace with your desired image/GIF URL
              style={tw`w-full h-[200px] rounded-t-lg`}
              resizeMode="cover"
            />

            {/* Modal Content */}
            <View style={tw`p-5`}>
              <Text
                style={tw`text-[#333] text-[18px] font-semibold text-center`}>
                Complete Your Profile
              </Text>
              <Text style={tw`text-[#555] text-[16px] mt-3 text-center`}>
                You need to submit all your details to proceed further. Please
                go back to your profile and update the necessary information.
              </Text>
            </View>

            {/* Gradient Button */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
                setProfileCheckModal(false);
              }}
              style={tw`my-5 mx-5 rounded-md`}>
              <LinearGradient
                colors={['#6A36CE', '#2575F6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={tw`rounded-md py-3 flex-row justify-center items-center`}>
                <Text style={tw`text-[#fff] text-[16px] font-semibold`}>
                  Go Back to Profile
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SpotLight;
