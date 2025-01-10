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
  const { agoraEngine, uid, userImage, userName , leave } = route.params;
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!agoraEngine) {
      console.error('Agora engine is not available');
      return;
    }

    const eventHandler = {
      onUserJoined: (_connection: RtcConnection, remoteUid: number) => {
        console.log(`User joined: ${remoteUid}`);
        setRemoteUsers(prev => [...prev, { uid: remoteUid, name: `User ${remoteUid}`, img: require('../../assets/profile.png') }]);
      },
      onUserOffline: (_connection: RtcConnection, remoteUid: number) => {
        console.log(`User left: ${remoteUid}`);
        setRemoteUsers(prev => prev.filter(user => user.uid !== remoteUid));
      },
    };

    agoraEngine.registerEventHandler(eventHandler);

    return () => {
      agoraEngine.unregisterEventHandler(eventHandler);
    };
  }, [agoraEngine]);

  const handleMute = () => {
    agoraEngine.muteLocalAudioStream(!isMuted);
    setIsMuted(!isMuted);
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
              source={{uri:userImage}}
              style={[tw`w-20 h-20 rounded-full`, { resizeMode: 'contain' }]}
            />
            <Text
              style={[
                tw`text-[#fff] text-[22px] font-401 leading-tight mt-3`,
                { textTransform: 'capitalize' },
              ]}
            >
              {/* {item.name} */}
              {userName}
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
        <TouchableOpacity onPress={leave}>
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
