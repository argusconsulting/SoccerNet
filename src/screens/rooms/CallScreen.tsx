import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {IRtcEngine, RtcConnection} from 'react-native-agora';
import {RouteProp} from '@react-navigation/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';

type CallScreenRouteParams = {
  CallScreen: {
    agoraEngine: IRtcEngine;
    uid: number;
    userName: string;
    userImage: any; 
  };
};

interface AudioRoom {
    img: any; // Replace `any` with the appropriate type for the image (e.g., ImageSourcePropType)
    name: string;
  }

type CallScreenProps = {
  route: RouteProp<CallScreenRouteParams, 'CallScreen'>;
};

const CallScreen: React.FC<CallScreenProps> = ({route}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {agoraEngine, uid , userImage , userName} = route.params;
  const [remoteUids, setRemoteUids] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  console.log("name & img", userImage , userName)

  useEffect(() => {
    if (!agoraEngine) {
      console.error('Agora engine is not available');
      return;
    }

    const eventHandler = {
      onUserJoined: (_connection: RtcConnection, remoteUid: number) => {
        console.log(`User joined: ${remoteUid}`);
        setRemoteUids(prev => [...prev, remoteUid]);
      },
      onUserOffline: (_connection: RtcConnection, remoteUid: number) => {
        console.log(`User left: ${remoteUid}`);
        setRemoteUids(prev => prev.filter(id => id !== remoteUid));
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

  const handleLeaveChannel = async () => {
    try {
      await agoraEngine.leaveChannel();
      navigation.navigate('MeetingChat');
      Alert.alert('You have left the call');
      // Optionally, navigate back to the previous screen or home
    } catch (err) {
      // Remove the extra (Error)
      console.error('Failed to leave the channel:');
    }
  };

  const audioRooms = [
    {
        img: require('../../assets/profile.png'),
        name: "Alex"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Alex"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Alex"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Alex"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Alex"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Abhinav"
    },
    {
        img: require('../../assets/profile.png'),
        name: "paras"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Alok"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Amit"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Shreyas"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Gurmeet"
    },
    {
        img: require('../../assets/profile.png'),
        name: "Sanchit"
    }

  ]

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
   <Header name=""/>

   {/* <FlatList
      data={audioRooms}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <LinearGradient
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
          style={[
            tw`m-2 rounded-lg w-45 py-4`,
            styles.glassBox,
          ]}
        >
          <Image
            source={item.img}
            style={[tw`w-20 h-20`, { resizeMode: 'contain' }]}
          />
          <Text
            style={[
              tw`text-[#fff] text-[22px] font-401 leading-tight mt-3`,
              { textTransform: 'capitalize' },
            ]}
          >
            {item.name}
          </Text>
        </LinearGradient>
      )}
      contentContainerStyle={{
        alignItems: 'center', // Center items horizontally
      }}
      ListEmptyComponent={
        <Text style={[tw`text-center`, { color: '#fff' }]}>
          No users in the call yet.
        </Text>
      }
    /> */}
      <FlatList
         data={remoteUids}
      
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View style={styles.avatar} />
            <Text
              style={[
                tw`text-[#fff] text-[20px] font-401 leading-tight `,
                {textTransform: 'capitalize'},
              ]}>
              User {item}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={[
              tw`text-[#fff] text-[20px] font-401 leading-tight `,
              {textTransform: 'capitalize'},
            ]}>
            No users in the call yet.
          </Text>
        }
      />
      <View style={styles.controls}>
        {/* Mute/Unmute Button */}
        <TouchableOpacity style={[tw`bg-[#fff] rounded-full p-2 self-center `,{overflow:"hidden"}]} onPress={handleMute}>
          {isMuted ? (
            <Image
              source={require('../../assets/mute-microphone.png')}
              style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
            />
          ) : (
            <Image
              source={require('../../assets/microphone.png')}
              style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
            />
          )}

        </TouchableOpacity>

        <TouchableOpacity style={[tw`bg-[#fff] rounded-full p-2 self-center`,{overflow:"hidden"}]} >
          {isMuted ? (
            <Image
              source={require('../../assets/no-sound.png')}
              style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
            />
          ) : (
            <Image
              source={require('../../assets/speaker.png')}
              style={[tw`w-12 h-12 self-center`, {resizeMode: 'contain'}]}
            />
          )}

        </TouchableOpacity>

        {/* Leave Channel Button */}
        <TouchableOpacity onPress={handleLeaveChannel}>
          <Image
            source={require('../../assets/end-call.png')}
            style={[tw`w-17 h-17`, {resizeMode: 'contain'}]}
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
        borderColor: 'rgba(255, 255, 255, 0.3)', // Subtle border for the glass effect
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
      },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007aff',
    marginRight: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#007aff',
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
  },
  leaveButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CallScreen;
