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
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/search-bar/search-bar';
import ScoreCard from '../../components/score-card/score-card';
import {useNavigation} from '@react-navigation/native';
import Menu from '../../components/menu/menu';
import {t} from 'i18next';
import {getSelectedLeagues} from '../../redux/leagueSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader/Loader';
import {getAllFixturesByDateRangeHighlights} from '../../redux/fixturesSlice';
import moment from 'moment';
import {getLiveScoresInPlay} from '../../redux/liveScoreSlice';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const lang = useSelector(state => state?.language_store?.language);
  const data = useSelector(state => state?.league?.selectedLeagues);
  const loading = useSelector(state => state?.league?.isLoadingSelectedLeagues);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const goalsValues =
    inPlayLiveScores?.data?.flatMap(item =>
      item.scores.map(score => score.score.goals),
    ) || [];
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

  useEffect(() => {
    if (monthRange.start && monthRange.end) {
      dispatch(
        getAllFixturesByDateRangeHighlights({
          start: monthRange.start,
          end: monthRange.end,
          page,
        }),
      );
    }
  }, [dispatch, monthRange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getSelectedLeagues({lang}));
    }, 2000); // Delay of 2 seconds (2000 ms)

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getLiveScoresInPlay());
  }, [dispatch]);

  const Item = ({item}) => (
    <View style={tw`bg-[#303649] p-3 mx-2 rounded-lg`}>
      <Image
        source={{uri: item?.image_path}}
        style={[tw`w-11 h-11 self-center`, {resizeMode: 'contain'}]}
      />
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
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
        <Text
          style={tw`text-white text-[22px] font-401 leading-tight  mt-3 mb-5 `}>
          {t('whatsOnYourMind')}
        </Text>

        <SearchBar />
      </View>
      <View>
        <View style={tw`flex-row justify-between mb-5`}>
          <Text
            style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5`}>
            {t('league')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LeagueScreen')}>
            <Text
              style={tw`text-[#8195FF] text-[14px] font-401 leading-tight  mt-5  px-5`}>
              {t('seeAll')}
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            data={data?.leagues}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={tw`px-3`}
          />
        )}
      </View>

      <View>
        <View style={tw`flex-row justify-between mt-3 mb-2`}>
          <Text
            style={tw`text-white text-[22px] font-401 leading-tight  mt-3  px-5`}>
            {t('liveNow')}
          </Text>
          {/* {inPlayLiveScores?.data?.length > 0 && (
            <Text
              style={tw`text-[#8195FF] text-[14px] font-401 leading-tight  mt-5  px-5`}>
              {t('seeAll')}
            </Text>
          )} */}
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
          <Text
            style={tw`text-[#fff] text-[20px] font-401 leading-tight  mt-5 self-center px-5`}>
            No Data Found !
          </Text>
        )}
      </View>

      <View>
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
            data={justFinishedData?.data?.slice(0, 5)}
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

      <Menu modalVisible={modalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
