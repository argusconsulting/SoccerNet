import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MultiSelectDropdown from '../../components/select-dropdown/select-dropdown';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getAllLeagues, postSelectedLeagues} from '../../redux/leagueSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alertify from '../../scripts/toast';

const LeagueSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allLeagues = useSelector(state => state?.league?.leagueData);
  const lang = useSelector(state => state?.language_store?.language);
  const [error, setError] = useState(false);
  const [selectedLeagues, setSelectedLeagues] = useState([]);

  useEffect(() => {
    dispatch(getAllLeagues({lang}));
  }, []);

  const sendLeagues = () => {
    if (selectedLeagues.length === 0) {
      // Show error if no leagues are selected
      setError(true);
      Alertify.error(t('selectAtLeastOneLeague'));
      return;
    }
    setError(false); // Reset error state if valid
    const leagueIds = selectedLeagues.map(league => league.league_id);
    dispatch(postSelectedLeagues(leagueIds));
    navigation.navigate('Home');
  };

  return (
    <View style={[tw`bg-[#05102E] h-full`, styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={tw`p-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name={'arrowleft'}
              size={24}
              color={'#fff'}
              style={tw`mt-1`}
            />
          </TouchableOpacity>
          <Text
            style={tw`text-[#fff] text-[34px] font-401 leading-normal mt-3`}>
            {t('selectFavLeague')}
          </Text>
          <Text
            style={tw`text-[#A9A9A9] text-[16px] font-400 leading-tight mt-3 w-80`}>
            {t('chooseMoreThanOne')}
          </Text>

          <MultiSelectDropdown
            leagueBy={t('leagueHeadingCountry')}
            leaguePlaceholder="Country leagues"
            data={allLeagues?.data}
            onSelectionChange={setSelectedLeagues}
          />

          {/* <View style={tw`border-b-[#a2a2a2] border-[1px]`} />
          <MultiSelectDropdown
            leagueBy={t('leagueHeadingIntercontinental')}
            leaguePlaceholder="Intercontinental leagues"
          />

          <View style={tw`border-b-[#a2a2a2] border-[1px]`} />
          <MultiSelectDropdown
            leagueBy={t('leagueHeadingWorldcup')}
            leaguePlaceholder="World cup leagues"
          /> */}
        </View>
      </ScrollView>

      {/* Fixed Continue Button */}
      <TouchableOpacity
        onPress={() => sendLeagues()}
        style={styles.continueButton}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.continueButtonGradient}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
            {t('continue')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default LeagueSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Pushes content to the top, leaves space for button at the bottom
  },
  scrollContent: {
    paddingBottom: 100, // Space for the fixed button at the bottom
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left: '6%',
    right: '6%',
    height: 55,
    marginHorizontal: '1',
    marginBottom: 10,
  },
  continueButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
