import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import debounce from 'lodash/debounce';
import React, {useCallback, useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/search-bar/search-bar';
import ScoreCard from '../../components/score-card/score-card';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Menu from '../../components/menu/menu';
import {t} from 'i18next';
import {getSelectedLeagues} from '../../redux/leagueSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader/Loader';
import {getAllFixturesByDateRangeHighlights} from '../../redux/fixturesSlice';
import moment from 'moment';
import {getLiveScoresInPlay} from '../../redux/liveScoreSlice';
import {clearTeamSearchData, teamSearchHandler} from '../../redux/searchSlice';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SelectedLeagues from '../../components/selected-leagues';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const lang = useSelector(state => state?.language_store?.language);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  // const searchedData = useSelector(state => state?.search.teamSearchData);
  const [page, setPage] = useState(1);
  const [monthRange, setMonthRange] = useState({start: '', end: ''});
  const justFinishedData = useSelector(
    state => state?.fixtures?.fixturesByDateRangeHighlights,
  );

  const inPlayLiveScores = useSelector(
    state => state?.liveScore?.liveScoreInPlayData,
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const getWeekRange = date => {
    // Set the end date to yesterday
    const end = moment(date).subtract(1, 'day').format('YYYY-MM-DD');

    // Set the start date to seven days before yesterday
    const start = moment(end).subtract(7, 'days').format('YYYY-MM-DD');

    setMonthRange({start, end});
  };

  useEffect(() => {
    getWeekRange(moment()); // Initialize with current month
  }, []);

  const fetchData = useCallback(() => {
    if (monthRange.start && monthRange.end) {
      dispatch(
        getAllFixturesByDateRangeHighlights({
          start: monthRange.start,
          end: monthRange.end,
          page,
          lang,
        }),
      );
    }
    dispatch(getLiveScoresInPlay());
  }, [dispatch, monthRange, lang, page]);

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
        // Show confirmation to exit the app
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default back action
      };

      // Add BackHandler listener when the screen is focused
      BackHandler.addEventListener('hardwareBackPress', backAction);

      // Cleanup listener when the screen loses focus
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])
  );



  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
    <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={tw`flex-row justify-between p-5`}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.4}>
            <Entypo name={'menu'} color={'#fff'} size={26} style={tw``} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={0.4}>
            <Ionicons
              name={'notifications'}
              color={'#fff'}
              size={26}
              style={tw``}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`px-5`}>
          {/* <Text
            style={tw`text-white text-[22px] font-401 leading-tight  mt-3 mb-5 `}>
            {t('whatsOnYourMind')}
          </Text> */}

          {/* <SearchBar
            onSearch={handleSearch}
            placeholderText={'Search By Leagues ...'}
          /> */}
          {/* {searchedData?.length > 0 && (
            <View style={tw`bg-[#303649] rounded-lg py-2`}>
              {searchedData?.map(e => {
                return (
                  <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('LeagueScreen', { seasonId: e?.currentseason?.id }) // Pass the league's id
                  }
                    style={tw`border-b-[0.5px] border-[#fff] mx-3 flex-row `}>
                    <Image
                      source={{uri: e?.image_path}}
                      style={[
                        tw`w-8 h-8 self-center ml-1`,
                        {resizeMode: 'contain'},
                      ]}
                    />
                    <Text
                      style={tw`text-white text-[14px] ml-4 font-401 leading-tight self-center my-3 `}>
                      {e?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )} */}
        </View>
    <SelectedLeagues/>

        <View>
          <View style={tw`flex-row justify-between mt-3 mb-2`}>
            <Text
              style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5`}>
              {t('liveNow')}
            </Text>

          </View>
          {inPlayLiveScores?.data?.length > 0 ? (
            <FlatList
              data={inPlayLiveScores?.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ScoreCard match={item} width={280} navigate={'LiveDetails'} />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={tw`items-center px-3`}
            />
          ) : (
            <TouchableOpacity
            style={[tw`bg-[#303649] h-34  rounded-2xl mt-5 mx-5 w-92 justify-center` ]}>
              <Image source={require('../../assets/no-data-live-now.png')} style={tw`w-14 h-14 self-center`}/>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-tight  self-center px-5`}>
             {t('Oops!ComeBackLater')}
            </Text>
             </TouchableOpacity>
          )}
        </View>

        <View >
          <View style={tw`flex-row justify-between mt-3 mb-2`}>
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
          {justFinishedData?.data?.length > 0 ? (
            <FlatList
              data={justFinishedData?.data?.slice(0, 15)}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <ScoreCard
                  match={item}
                  width={280}
                  navigate={'HighlightDetail'}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={tw`items-center px-3`}
            />
          ) : (
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-tight  mt-5 self-center px-5`}>
              No Data Found !
            </Text>
          )}
        </View> 
        </ScrollView>
         <View style={[tw`absolute bottom-0 w-full h-60`,{zIndex: -1}]}>
    <Image
      source={require('../../assets/Homescreen-bg.png')}
      style={tw`w-full h-60`}
      resizeMode="cover"
    
    />
    <LinearGradient
    colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
    start={{x: 0.5, y: 0}} // Top center
    end={{x: 0.5, y: 1}} // Slight fade into transparency
    style={tw`absolute top-0 w-full h-20 `} // Adjust height to control blur size
  />
  </View>
       
      
      <Menu modalVisible={modalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
