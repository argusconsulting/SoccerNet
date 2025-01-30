import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
// Import user interface elements
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Import components related to obtaining Android device permissions
import {PermissionsAndroid, Platform} from 'react-native';
// Import Agora SDK
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcConnection,
  IRtcEngineEventHandler,
} from 'react-native-agora';
import { useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from '../../styles/tailwind';
import { postApi } from '../../scripts/api-services';
import { api_name_agora_token } from '../../constants/api-constants';
import Loader from '../loader/Loader';




  // Define the Redux state type inline
  interface AuthStore {
    userID: number; // or `string` based on your actual data
  }
  interface ProfileStore {
    userProfileData: {
      name: string;
      avatar_url: string;
      email: string;
    };
  }

  interface RootState {
    auth_store: AuthStore;
    profile: ProfileStore;
  }

  interface GroupCallProps {
    groupName: string;
    creatorId: number;
    groupId: number;
  }
// Define basic information
const appId = 'fe78bc42c5464befadcf442ed64d9485';

const GroupCall: React.FC<GroupCallProps> = ({ groupName , creatorId, groupId}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const uid = useSelector((state: RootState) => state.auth_store.userID);
  const agoraEngineRef = useRef<IRtcEngine>(); 
  const [isJoined, setIsJoined] = useState(false); 
  const [isHost, setIsHost] = useState(true); // User role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // User prompt message
  const [agoraToken , setAgoraToken] = useState(String)
  const [loading, setLoading] = useState(false);
  const eventHandler = useRef<IRtcEngineEventHandler>(); 

  console.log("in icon -------------->", groupName, creatorId, groupId)

  useEffect(() => {

    // const getAgoraToken = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await postApi(api_name_agora_token, {
    //       channel_name: groupName,
    //       uid,
    //       role: creatorId === uid ? 'publisher' : 'subscriber',
    //       group_id: groupId,
    //     });
    //     setAgoraToken(response?.data?.token || '');
    //   } catch (error) {
    //     console.error('Error fetching Agora token:');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // getAgoraToken();
    setupVideoSDKEngine();

   
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, []);

 
  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after obtaining device permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      eventHandler.current = {
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined channel: ' + groupName);
          setIsJoined(true);
        },
        onUserJoined: (_connection: RtcConnection, uid: number) => {
          showMessage('Remote user ' + uid + ' joined');
          setRemoteUid(uid);
        },
        onUserOffline: (_connection: RtcConnection, uid: number) => {
          showMessage('Remote user ' + uid + ' left the channel');
          setRemoteUid(0);
        },
      };

      // Register the event handler
      agoraEngine.registerEventHandler(eventHandler.current);
      // Initialize the engine
      agoraEngine.initialize({
        appId: appId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    try {
      // Prevent duplicate joining
      if (isJoined) return;
  
      // Fetch Agora token before joining
      setLoading(true);
      const response = await postApi(api_name_agora_token, {
        channel_name: groupName,
        uid,
        role: creatorId === uid ? 'publisher' : 'subscriber',
        group_id: groupId,
      });
  
      const token = response?.data?.token || '';
      if (!token) {
        console.log('Failed to fetch Agora token. Cannot join channel.');
        return;
      }
  
      // Join the Agora channel
      await agoraEngineRef.current?.joinChannel(token, groupName, uid, {
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishMicrophoneTrack: true,
        autoSubscribeAudio: true,
      });
  
      console.log('Joined channel successfully');
  
      // Navigate to CallScreen after successfully joining
      navigation.navigate('CallScreen', {
        agoraEngine: agoraEngineRef.current,
        leave,
      });
    } catch (error) {
      console.error('Failed to join channel:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // const join = async () => {
  //   if (!agoraToken) {
  //     console.log('Agora token is not available. Cannot join channel.');
  //     return;
  //   }

  //   if (isJoined) return; // Prevent duplicate joining

  //   try {

  //     await agoraEngineRef.current?.joinChannel(agoraToken, groupName, uid, {
  //       channelProfile: ChannelProfileType.ChannelProfileCommunication,
  //       // clientRoleType: isHost
  //       //   ? ClientRoleType.ClientRoleBroadcaster
  //       //   : ClientRoleType.ClientRoleAudience,
  //       // publishMicrophoneTrack: isHost, // Publish mic track only if host
  //       // autoSubscribeAudio: true, // Subscribe to audio

  //       clientRoleType: ClientRoleType.ClientRoleBroadcaster, 
  //       publishMicrophoneTrack: true,
  //       autoSubscribeAudio: true, 
  //     });

  //     console.log('Joined channel successfully');

  //     // Navigate to CallScreen after successfully joining
  //     navigation.navigate('CallScreen', {
  //       agoraEngine: agoraEngineRef.current,
  //       leave
  //     });
  //   } catch (error) {
  //     console.error('Failed to join channel:', error);
  //   }
  // };

  // Define the leave method called after clicking the leave channel button
  const leave = () => {
    try {
   

      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      console.log('left channel successfully');
      navigation.navigate('SpotLight')
      showMessage('Left the channel');
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View style={tw`flex-row`}>
      {loading ? 
      <View style={tw`mr-5`}>
         <Loader/> 
         </View> 
      : 
      <TouchableOpacity onPress={join}>
        <AntDesign
          name={'phone'}
          size={20}
          color={'#fff'}
          style={tw`self-center mr-5 mt-1`}
        />
      </TouchableOpacity>
}
    </View>
  );


  function showMessage(msg: string) {
    setMessage(msg);
  }
};

export default GroupCall;

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
});
