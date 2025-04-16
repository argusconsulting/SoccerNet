import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderBoard } from '../../redux/fanPhotosSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const leaderboardData = useSelector(state => state?.fanPhotos?.leaderBoard);

  useEffect(() => {
    dispatch(getLeaderBoard());
  }, [dispatch]);
 

  const getTopThreeUsers = leaderboardData => {
    if (!leaderboardData || leaderboardData.length === 0) return [];

    const sorted = [...leaderboardData].sort((a, b) => {
      const aTotal = a.likes_count + a.claps_count + a.hearts_count;
      const bTotal = b.likes_count + b.claps_count + b.hearts_count;
      return bTotal - aTotal;
    });

    const colors = ['#FDBB30', '#2B61E3', '#2ECC71']; 
    const topThree = sorted.slice(0, 3).map((user, index) => ({
      ...user,
      score: user.likes_count + user.claps_count + user.hearts_count,
      rank: index + 1,
      color: colors[index],
      image: user.image || null, 
    }));

    return topThree;
  };

  const topThreeUsers = getTopThreeUsers(leaderboardData);
  const firstPlace = topThreeUsers[0];
  const secondPlace = topThreeUsers[1];
  const thirdPlace = topThreeUsers[2];

  const fallbackImage = require('../../assets/icons/football.png');

  const Podium = ({ user }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const rotate = useSharedValue(0);
    
    useEffect(() => {
      if (user?.rank === 1) {
        scale.value = withTiming(1.2, { duration: 500 }, () => {
          scale.value = withTiming(1, { duration: 300 });
        });
        opacity.value = withTiming(1, { duration: 800 });
        rotate.value = withTiming(5, { duration: 400 }); // subtle wave
      }
    }, [user]);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          { scale: scale.value },
          { rotateZ: `${Math.sin(rotate.value) * 0.1}rad` },
        ],
      };
    });
  

    if (!user) return null;
  
    return (
      <View
        style={[
          styles.podiumBlock,
          {
            height: user.rank === 1 ? 180 : 140,
            backgroundColor: user.rank === 1 ? '#252A40' : '#1E2237',
          },
        ]}
      >
         {user.rank === 1 && (
          <Animated.Text style={[animatedStyle, styles.winnerText]}>
             Winner!
          </Animated.Text>
        )}
        {user.rank === 1 && (
          <FontAwesome5 name="crown" size={24} color={user.color} style={{ position: 'absolute', top: -20 }} />
        )}
        <Image
          source={user?.image ? { uri: user.image } : fallbackImage}
          style={[styles.avatar, { borderColor: user.color }]}
        />
        <Text style={[styles.userName, { marginTop: user.rank === 1 ? 15 : 0 }]}>
          {user?.username}
        </Text>
        <Text style={[styles.score, { color: user.color }]}>
          {user?.score}
        </Text>
        <AntDesign name="like1" size={18} color={user.color} style={tw`mb-2`} />
  
       
      </View>
    );
  };

  
  // const Podium = ({ user }) => {
  //   if (!user) return null;

  //   return (
  //     <View
  //       style={[
  //         styles.podiumBlock,
  //         {
  //           height: user.rank === 1 ? 180 : 140,
  //           backgroundColor: user.rank === 1 ? '#252A40' : '#1E2237',
  //         },
  //       ]}
  //     >
  //       {user.rank === 1 && (
  //         <FontAwesome5 name="crown" size={24} color={user.color} style={{ position: 'absolute', top: -20 }} />
  //       )}
  //       <Image
  //         source={user?.image ? { uri: user.image } : fallbackImage}
  //         style={[styles.avatar, { borderColor: user.color }]}
  //       />
  //       <Text style={[styles.userName, { marginTop: user.rank === 1 ? 15 : 0 }]}>
  //         {user?.username}
  //       </Text>
  //       <Text style={[styles.score, { color: user.color }]}>
  //         {user?.score}
  //       </Text>
  //       <AntDesign name="like1" size={18} color={user.color} style={tw`mb-5`} />
  //     </View>
  //   );
  // };

  const Item = ({ item }) => (
    <View style={tw`flex-row p-2 items-center justify-between my-3 border-b-[2px] border-[#5F59598A] mx-5`}>
      <View style={tw`flex-row items-center mb-2`}>
        <Image
          source={item?.image ? { uri: item.image } : fallbackImage}
          style={[tw`w-15 h-15 rounded-full`, { resizeMode: 'cover' }]}
        />
        <Text style={tw`text-[#fff] text-[18px] font-402 ml-6 leading-tight`}>
          {item?.username}
        </Text>
      </View>
      <View>
        <Text style={tw`text-[#fff] text-[20px] font-401 mx-1 mt-1 leading-tight`}>
          {item?.likes_count + item?.claps_count + item?.hearts_count}
        </Text>
        <AntDesign name="like1" size={20} color={'#fff'} style={tw`self-center mt-1`} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`bg-[#05102E] flex-1`}>
      <Header name={'Leaderboard'} />
      <View style={styles.container}>
        <View style={styles.podiumContainer}>
          <Podium user={secondPlace} />
          <Podium user={firstPlace} />
          <Podium user={thirdPlace} />
        </View>
      </View>
      <View style={tw`bg-[#1E2237] w-full mt-20 rounded-t-3xl mb-3`}>
        <FlatList
          data={leaderboardData}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id?.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  podiumBlock: {
    width: 115,
    backgroundColor: '#1E2237',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 2,
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 5,
  },
  userName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  score: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  winnerText: {
    color: '#FDBB30',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 0,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
});
