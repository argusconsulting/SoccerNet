import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { IRtcEngine, RtcConnection } from 'react-native-agora';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import { useDispatch } from 'react-redux';
import { postApi } from '../../scripts/api-services';
import { api_name_getUserDetail_from_Id } from '../../constants/api-constants';

type CallScreenRouteParams = {
  CallScreen: {
    agoraEngine: IRtcEngine;
    uid: number;
    userName: string;
    userImage: any;
    leave: any
  };
};

type CallScreenProps = {
  route: RouteProp<CallScreenRouteParams, 'CallScreen'>;
};

const CallScreen: React.FC<CallScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { agoraEngine,  leave } = route.params;
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const [fetchedUids, setFetchedUids] = useState<number[]>([]);

  const fetchUserDetailsFromId = async (uids: number[]) => {
    try {
      const response = await postApi(api_name_getUserDetail_from_Id, {
        user_ids: uids,
      });
      console.log('Fetched user details:', response);
      return response;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!agoraEngine) {
      console.error('Agora engine is not available');
      return;
    }

    const eventHandler = {
      onUserJoined: async (_connection: RtcConnection, remoteUid: number) => {
        console.log(`User joined: ${remoteUid}`);

        // Check if the UID is already fetched
        if (!fetchedUids.includes(remoteUid)) {
          const response = await fetchUserDetailsFromId([remoteUid]);
          if (response && response.data) {
            // Update the remote users state with fetched user details
            setRemoteUsers((prev) => [
              ...prev,
              ...response?.data?.users?.map((user: any) => ({
                uid: user.id,
                name: user.name,
                img: user.avatar_url || require('../../assets/profile.png'),
              })),
            ]);
            setFetchedUids((prev) => [...prev, remoteUid]); // Mark UID as fetched
          }
        }
      },
      onUserOffline: (_connection: RtcConnection, remoteUid: number) => {
        console.log(`User left: ${remoteUid}`);
        setRemoteUsers((prev) => prev.filter((user) => user.uid !== remoteUid));
      },
    };

    agoraEngine.registerEventHandler(eventHandler);

    return () => {
      agoraEngine.unregisterEventHandler(eventHandler);
    };
  }, [agoraEngine, fetchedUids]);


  const handleMute = () => {
    agoraEngine.muteLocalAudioStream(!isMuted);
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    agoraEngine.setEnableSpeakerphone(!isSpeakerEnabled);
    setIsSpeakerEnabled(!isSpeakerEnabled);
  };


  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="" />
      <FlatList
        data={remoteUsers}
        numColumns={2}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={({ item }) => (
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
            style={[tw`m-2 rounded-lg w-45 py-4`, styles.glassBox]}
          >
            <Image
              source={{uri:item?.img}}
              style={[tw`w-20 h-20 rounded-full`, { resizeMode: 'cover' }]}
            />
            <Text
              style={[
                tw`text-[#fff] text-[22px] font-401 leading-tight mt-3`,
                { textTransform: 'capitalize' },
              ]}
            >
              {/* {item.name} */}
              {item?.name}
            </Text>
          </LinearGradient>
        )}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        ListEmptyComponent={
          <Text style={[tw`text-center`, { color: '#fff' }]}>
            No users in the call yet.
          </Text>
        }
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            tw`bg-[#fff] rounded-full p-2 self-center`,
            { overflow: 'hidden' },
          ]}
          onPress={handleMute}
        >
          <Image
            source={
              isMuted
                ? require('../../assets/mute-microphone.png')
                : require('../../assets/microphone.png')
            }
            style={[tw`w-12 h-12 self-center`, { resizeMode: 'contain' }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw`bg-[#fff] rounded-full p-2 self-center`,
            { overflow: 'hidden' },
          ]}
          onPress={toggleSpeaker}
        >
          <Image
            source={
              isSpeakerEnabled
                ? require('../../assets/speaker.png')
                : require('../../assets/no-sound.png')
            }
            style={[tw`w-12 h-12 self-center`, { resizeMode: 'contain' }]}
          />
        </TouchableOpacity>
   
        <TouchableOpacity onPress={()=>leave()}>
          <Image
            source={require('../../assets/end-call.png')}
            style={[tw`w-17 h-17`, { resizeMode: 'contain' }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassBox: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default CallScreen;
