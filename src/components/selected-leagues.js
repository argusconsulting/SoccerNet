import React, {useEffect, useCallback} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectedLeagues} from '../redux/leagueSlice';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import tw from '../styles/tailwind';
import Loader from './loader/Loader';

const SelectedLeagues = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state) => state.league.selectedLeagues);
  const lang = useSelector((state) => state.language_store.language);
  const loading = useSelector((state) => state.league.isLoadingSelectedLeagues);
  const isFetched = useSelector((state) => state.league.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getSelectedLeagues({lang}));
    }
  }, [isFetched, lang, dispatch]);

  // Memoized navigation callback to avoid re-creating the function
  const navigateToLeagueScreen = useCallback(() => {
    navigation.navigate('LeagueScreen');
  }, [navigation]);

  // Memoized rendering of each list item
  const renderItem = useCallback(
    ({item}) => (
      <View style={tw`bg-[#303649] p-1.5 mx-2 rounded-lg`}>
        <View
          style={[
            tw`w-14 h-14 self-center`,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              elevation: 20,
              borderRadius: 999,
            },
          ]}
        >
          <Image
            source={{uri: item?.image_path}}
            style={[
              tw`w-10 h-10 self-center mt-2`,
              {resizeMode: 'contain', borderRadius: 999},
            ]}
          />
        </View>
      </View>
    ),
    []
  );

  return (
    <View>
      <View>
        <View style={tw`flex-row justify-between mb-5`}>
          <Text style={tw`text-white text-[22px] font-401 leading-tight mt-3 px-5`}>
            {t('league')}
          </Text>
          <TouchableOpacity onPress={navigateToLeagueScreen}>
            <Text style={tw`text-[#8195FF] text-[14px] font-401 leading-tight mt-5 px-5`}>
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
            renderItem={renderItem} // Use memoized renderItem
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`px-3`}
          />
        )}
      </View>
    </View>
  );
});

export default SelectedLeagues;
