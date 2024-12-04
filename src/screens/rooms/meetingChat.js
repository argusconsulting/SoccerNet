import {
  Alert,
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
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {
  getMessages,
  inActiveRoomHandler,
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
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const userId = useSelector(state => state.auth_store.userID);
  const groupId = route?.params?.groupId;
  const groupName = route?.params?.groupName;

  console.log('id, name', groupId, groupName);

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

  // Initialize Pusher
  useEffect(() => {
    let channel; // Declare channel outside of useEffect to ensure it's accessible for cleanup

    const initializePusher = async () => {
      const pusherInstance = Pusher.getInstance();

      await pusherInstance.init({
        apiKey: '34e8ce6685ada31490ca',
        cluster: 'ap2',
        authEndpoint: 'https://kickscore.eprime.app/api/broadcasting/auth',
      });

      await pusherInstance.connect();

      // Subscribe to the channel
      channel = await pusherInstance.subscribe({
        channelName: `group.${groupId}`,
        onSubscriptionSucceeded: (channelName, data) => {
          // console.log(`Subscribed to ${channelName}`);
        },
        onEvent: event => {
          console.log(`Event received: ${event}`);

          try {
            const parsedData = JSON.parse(event?.data);
            const messageData = parsedData?.message;

            if (messageData) {
              const newMessage = {
                id: messageData.id, // Ensure the message has a unique ID
                user: messageData.user,
                content: messageData.content,
                createdAt: new Date(messageData.createdAt),
              };

              // Append the new message to the `messages` state
              setMessages(prevMessages => [...prevMessages, newMessage]);
            } else {
              console.warn('Message data is missing:', parsedData);
            }
          } catch (error) {
            console.error('Error parsing event data:', error);
          }
        },
      });

      channel.bind('pusher:subscription_error', error => {
        console.log('Subscription error:', error);
      });
    };

    initializePusher();

    // Cleanup function to unsubscribe from the channel when the component unmounts
    return () => {
      if (channel) {
        channel.unsubscribe();
        console.log('Unsubscribed from the channel');
      }
    };
  }, [groupId]); // Dependency array ensures the effect runs again when groupId changes

  // Fetch messages on component mount
  useEffect(() => {
    // Fetch messages only once on initial mount
    dispatch(getMessages(groupId))
      .then(fetchedMessages => {
        if (Array.isArray(fetchedMessages?.payload?.messages)) {
          setMessages(fetchedMessages?.payload?.messages); // Directly set messages
        } else {
          console.warn(
            'Fetched messages are not in an array format:',
            fetchedMessages,
          );
        }
      })
      .finally(() => {
        setLoadingInitial(false);
      });
  }, [dispatch, groupId]);

  const Item = ({item}) => {
    const isSender = item?.user?.id === userId;
    return (
      <View style={[tw` `, isSender ? tw`items-end` : tw`items-start`]}>
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
        <View style={tw`flex-row `}>
          <TouchableOpacity
            onPress={() => leaveHandler()}
            style={[
              tw`rounded-lg justify-center `,
              {
                width: '40',
                height: 30,
                alignSelf: 'center',
              },
            ]}>
            <LinearGradient
              colors={['#6A36CE', '#2575F6']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[
                tw`rounded-lg justify-center flex-row px-2`,
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
      </View>

      {/* Chat */}
      {loadingInitial ? (
        <Loader />
      ) : (
        <View style={tw`mb-30`}>
          <FlatList
            data={messages}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id?.toString()}
          />
        </View>
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
