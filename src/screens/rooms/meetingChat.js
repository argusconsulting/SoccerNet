import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextInput from '../../components/library/text-input';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMessages,
  leaveMeetingRooms,
  sendMessages,
} from '../../redux/fanSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../components/loader/Loader';

const MeetingChat = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [message, setMessage] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const userId = useSelector(state => state.auth_store.userID);
  const data = useSelector(state => state.room?.messages);
  const loading = useSelector(state => state.room?.isLoadingMessage);
  const groupId = route?.params?.groupId;
  const groupName = route?.params?.groupName;

  const leaveHandler = () => {
    dispatch(leaveMeetingRooms({userId, groupId})).then(() => {
      navigation.navigate('SpotLight');
    });
  };

  const sendMessagesHandler = () => {
    dispatch(sendMessages({userId, groupId, message})).then(() => {
      setMessage(null);
    });
  };

  useEffect(() => {
    // Initial load with loader
    dispatch(getMessages(groupId)).finally(() => {
      setLoadingInitial(false); // Loader hides after initial load
    });

    // Interval for fetching messages every 2 seconds without loader
    const intervalId = setInterval(() => {
      dispatch(getMessages(groupId));
    }, 2000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [dispatch, groupId]);

  const Item = ({item}) => {
    const isSender = item?.user?.id === userId;

    return (
      <View style={[tw`flex-1`, isSender ? tw`items-end` : tw`items-start`]}>
        {!isSender && (
          <View style={[tw`flex-row mt-4`]}>
            <Image
              source={{uri: item?.user?.formatted_avatar_url}}
              style={tw`w-6 h-6 mx-3 rounded-full`}
            />
            <Text
              style={tw`text-[#F5C451] text-[14px] font-401 leading-tight self-center`}>
              {item?.user?.name}
            </Text>
          </View>
        )}

        <View
          style={[
            tw`rounded-3xl mt-3 px-4 py-2`,
            isSender ? tw`bg-[#6A36CE] mr-5` : tw`bg-[#303649] ml-8`,
          ]}>
          <Text style={tw`text-[#fff] text-[14px] font-401 leading-tight`}>
            {item?.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <View style={tw`bg-[#303649] p-3 flex-row justify-between`}>
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name={'arrowleft'}
              size={24}
              color={'#fff'}
              style={tw`mr-3 mt-1`}
            />
          </TouchableOpacity>
          <Text
            style={tw`text-[#fff] text-[20px] font-401 leading-tight self-center`}>
            {groupName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => leaveHandler()}
          style={[
            tw`rounded-lg justify-center`,
            {
              width: '25%',
              height: 30,
              alignSelf: 'center',
            },
          ]}>
          <LinearGradient
            colors={['#6A36CE', '#2575F6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              tw`rounded-lg justify-center flex-row`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <AntDesign
              name={'arrowleft'}
              size={20}
              color={'#fff'}
              style={tw`mr-2 self-center`}
            />
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
              Leave
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Chat */}
      {loadingInitial ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      )}

      {/* Fixed Bottom Input Row */}
      <View style={[tw`flex-row p-2 bg-[#05102E]`, styles.inputContainer]}>
        <TextInput
          placeholder="Message ..."
          value={message}
          onChangeText={text => setMessage(text)}
          style={tw`flex-1 w-75 h-12 rounded-3xl px-4 border-[#a9a9a9] border-[1px] mx-2`}
        />
        <TouchableOpacity onPress={() => sendMessagesHandler()}>
          <Image
            source={require('../../assets/send.png')}
            style={tw`w-12 h-12 ml-2 self-center`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeetingChat;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
