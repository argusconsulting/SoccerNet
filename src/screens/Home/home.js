import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import notifee, { AndroidImportance } from  '@notifee/react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import tw from '../../styles/tailwind';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScoreCard from '../../components/score-card/score-card';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Menu from '../../components/menu/menu';
import {t} from 'i18next';
import { useDispatch, useSelector} from 'react-redux';
import {getAllFixturesByDate, getAllFixturesByDateRangeHighlights} from '../../redux/fixturesSlice';
import moment from 'moment';
import {getLiveScoresInPlay} from '../../redux/liveScoreSlice';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SelectedLeagues from '../../components/selected-leagues';
import {notificationsCount} from '../../redux/announcementSlice';
import {store} from '../../redux/store';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const lang = useSelector(state => state?.language_store?.language);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {width} = useWindowDimensions();
  const [monthRange, setMonthRange] = useState({start: '', end: ''});
  const currDateData = useSelector(state => state?.fixtures?.fixturesByDate);
  const justFinishedData = useSelector(
    state => state?.fixtures?.fixturesByDateRangeHighlights
  );
  const selectedData = useSelector(state => state.league.selectedLeagues);
  const lastScores = useRef(null);
  const intervalId = useRef(null);
    const [selectedDate, setSelectedDate] = useState(
      moment().format('YYYY-MM-DD'), // Initialize with current date
    );
  const notificationsCountNumber = useSelector(
    state => state?.announcement?.notificationsCount,
  );
  const inPlayLiveScores = useSelector(
    state => state?.liveScore?.liveScoreInPlayData,
  );


  const getWeekRange = date => {
    // Set the end date to yesterday
    const end = moment(date).subtract(1, 'day').format('YYYY-MM-DD');

    // Set the start date to seven days before yesterday
    const start = moment(end).subtract(7, 'days').format('YYYY-MM-DD');

    setMonthRange({start, end});
  };

  useEffect(() => {
    getWeekRange(moment()); 
  }, []);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(notificationsCount());
    });
    return willFocusSubscription;
  }, [dispatch]);

  const fetchData = useCallback(() => {
    if (monthRange.start && monthRange.end) {
      dispatch(
        getAllFixturesByDateRangeHighlights({
          start: monthRange.start,
          end: monthRange.end,
          page: 1,
          lang,
        }),
      );
    }
  }, [dispatch, monthRange, lang]);



  useFocusEffect(
    useCallback(() => {
      const fetchScores = async () => {
        await dispatch(getLiveScoresInPlay());
        const latestScores = store.getState().liveScore.liveScoreInPlayData.data;
  
        if (JSON.stringify(latestScores) !== JSON.stringify(lastScores.current)) {
          console.log('Scores Updated:', latestScores);
          lastScores.current = latestScores;
        } else {
          console.log('No Change in Scores');
        }
      };
  
      fetchScores(); // Fetch immediately
  
      if (intervalId.current) {
        clearInterval(intervalId.current); // Clear existing interval
      }
  
      intervalId.current = setInterval(
        fetchScores,
        inPlayLiveScores?.data?.length > 0 ? 5000 : 1000 * 60 * 5
      );
  
      return () => {
        if (intervalId.current) {
          clearInterval(intervalId.current); // Cleanup on unmount
        }
      };
    }, [dispatch, inPlayLiveScores?.data?.scores]),
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );

  const selectedLeagueIds = useMemo(() => 
    selectedData?.leagues?.map(item => item.league_id) || [], 
    [selectedData]
  );

  const filteredData = useMemo(() => {
    return justFinishedData?.data?.filter(justFinishedLeague => 
      selectedLeagueIds.includes(justFinishedLeague.league_id)
    );
  }, [justFinishedData, selectedLeagueIds]);


  const toggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);

    useEffect(() => {
      dispatch(getAllFixturesByDate(selectedDate));
    }, [dispatch, selectedDate]);

   

    const scheduledMatchesRef = useRef(new Set());

    const scheduleMatchNotification = async (match) => {
      await notifee.requestPermission();
    
      // Create a notification channel (only needed once)
      await notifee.createChannel({
        id: "match-notifications",
        name: "Match Notifications",
        sound: "default",
        importance: AndroidImportance.HIGH,
      });
    
      // Convert match start time to a timestamp
      const matchTimestamp = new Date(match.starting_at).getTime();
      
      // Schedule notification 1 hour 17 minutes before the match
      const notificationTime = matchTimestamp - (1 * 60 * 60 * 1000) ;
    
      console.log("Now:", new Date(Date.now()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
      console.log("Match Start Time (IST):", new Date(matchTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
      console.log("Notification Time (IST):", new Date(notificationTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
      console.log("Time Difference:", notificationTime - Date.now(), "ms");
    
      if (notificationTime > Date.now()) {
        if (!scheduledMatchesRef.current.has(match.id)) { 
          await notifee.createTriggerNotification(
            {
              title: "Upcoming Match!",
              body: `${match.name} starts in 1 hour !`,
              android: {
                channelId: "match-notifications",
                sound: "default",
                importance: AndroidImportance.HIGH,
              },
            },
            { type: 0, timestamp: notificationTime }
          );
    
          scheduledMatchesRef.current.add(match.id); // ✅ Store match ID
          console.log(`✅ Notification scheduled for ${match.name}`);
        } else {
          console.log(`⚠️ Notification for ${match.name} already exists`);
        }
      } else {
        console.log(`❌ Skipping ${match.name}, notification time has passed.`);
      }
    };
    
    useEffect(() => {
      let intervalId;
      
      const checkAndScheduleNotifications = async () => {
        if (currDateData?.data?.length) {
          const now = Date.now();
          console.log("Current Time (IST):", new Date(now).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    
          for (const match of currDateData.data) {
            const matchTime = new Date(match.starting_at).getTime();
            const notificationTime = matchTime - (1 * 60 * 60 * 1000);
    
            if (now < notificationTime) {
              if (!scheduledMatchesRef.current.has(match.id)) {
                console.log(`✅ Scheduling Notification for: ${match.name}`);
                await scheduleMatchNotification(match);
              } else {
                console.log(`⚠️ Skipping duplicate notification for ${match.name}`);
              }
            } else {
              console.log(`❌ Skipping ${match.name}, notification time has passed.`);
            }
          }
        }
      };
    
      checkAndScheduleNotifications(); // Run immediately
    
      // Clear previous interval before starting a new one
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(checkAndScheduleNotifications, 60 * 1000);
    
      return () => clearInterval(intervalId); // Cleanup on unmount
    }, [currDateData]);
    
    
    
    
  return (
    <SafeAreaView style={tw`bg-[#05102E] flex-1 `}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={tw`flex-row justify-between p-5`}>
          <TouchableOpacity
            onPress={toggleModal}
            activeOpacity={0.4}>
            <Entypo name={'menu'} color={'#fff'} size={26} style={tw``} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={0.4}
            style={tw`flex-row justify-center self-center`}>
            <Ionicons
              name={'notifications'}
              color={'#fff'}
              size={26}
              style={tw`mr-3`}
            />
            <View
              style={[
                tw`bg-red-500 mt--2 mr-2 rounded-full w-5 h-5 justify-center`,
                {position: 'absolute'},
              ]}>
              <Text
                style={[
                  tw`text-[#fff] text-[12px] font-400  leading-tight self-center  `,
                ]}>
                {notificationsCountNumber}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`px-5`}></View>
       
        <SelectedLeagues />

        <View>
          <View style={tw`justify-between mt-3 mb-2`}>
            {lang == 'ar' ?  
            <Text
              style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5 self-end`}>
              {t('liveNow')}
            </Text>:  <Text
              style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5`}>
              {t('liveNow')}
            </Text> }
           
          </View>
          {inPlayLiveScores?.data?.length > 0 ? (
            <FlatList
              data={inPlayLiveScores?.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ScoreCard
                  match={item}
                  width={280}
                  screen={'Home'}
                  navigate={'LiveDetails'}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={tw`items-center px-3`}
            />
          ) : (
            <TouchableOpacity
              style={[
                tw`bg-[#303649] h-34  rounded-2xl mt-5 mx-5  justify-center`,
                {width: width - 40},
              ]}>
              <Image
                source={require('../../assets/no-data-live-now.png')}
                style={tw`w-14 h-14 self-center`}
              />
              <Text
                style={tw`text-[#fff] text-[20px] font-401 leading-tight  self-center px-5`}>
                {t('Oops!ComeBackLater')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
        <View style={tw`${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'} justify-between mt-3 mb-2`}>
            <Text
              style={tw`text-white text-[22px] font-401 leading-tight  mt-3 px-5`}>
              {t('justFinished')}
            </Text>
            {justFinishedData?.data?.length > 0 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('JustFinished')}>
                <Text
                  style={tw`text-[#8195FF] text-[14px] font-401 leading-tight  mt-5  px-5`}>
                  {t('seeAll')}
                </Text>
              </TouchableOpacity>
            )}
          </View> 
        
          
          {filteredData?.length > 0 ? (
           <FlatList
           data={filteredData}
           horizontal
           showsHorizontalScrollIndicator={false}
           renderItem={({ item }) => (
             <ScoreCard
               match={item}
               width={280}
               screen={'Home'}
               navigate={'HighlightDetail'}
             />
           )}
           keyExtractor={(item, index) => index.toString()}
           contentContainerStyle={tw`items-center px-3`}
           initialNumToRender={5} 
           windowSize={5} 
           getItemLayout={(data, index) => ({
             length: 280, // Item width
             offset: 280 * index,
             index,
           })}
         />
          ) : (
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-tight  mt-5 self-center px-5`}>
              No Data Found !
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={[tw`absolute bottom-0 w-full h-60`, {zIndex: -1}]}>
        <Image
          source={require('../../assets/Homescreen-bg.png')}
          style={tw`w-full h-60`} 
          resizeMode="cover"
          fadeDuration={300}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
          start={{x: 0.5, y: 0}} 
          end={{x: 0.5, y: 1}} 
          style={tw`absolute top-0 w-full h-20 `} 
        />
      </View>

      <Menu modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
