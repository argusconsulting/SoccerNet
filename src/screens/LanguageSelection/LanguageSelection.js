import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../components/gradient-button/gradient-button';
import {loadStoredLanguage, setLanguage} from '../../redux/languageSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const LanguageSelection = () => {
  const {i18n, t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Make sure to define navigation
  const selectedLanguage = useSelector(
    state => state?.language_store?.language,
  );

  // useEffect(() => {
  //   const loadLanguage = async () => {
  //     await dispatch(loadStoredLanguage());
  //     setLoading(false);
  //   };

  //   loadLanguage();
  // }, [dispatch]);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Arabic',
      image: require('../../assets/flags/arab.png'),
      lng: 'arb',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'English',
      image: require('../../assets/flags/uk.png'),
      lng: 'en',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Spanish',
      image: require('../../assets/flags/spain.png'),
      lng: 'spanish',
    },
    {
      id: '58694a0f-3da1-4bd96-145571e29d72',
      title: 'French',
      image: require('../../assets/flags/france.png'),
      lng: 'french',
    },
    {
      id: '58694a0f-3da1-471f-96-145571e29d72',
      title: 'German',
      image: require('../../assets/flags/germany.png'),
      lng: 'german',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2',
      title: 'Italian',
      image: require('../../assets/flags/italy.png'),
      lng: 'italian',
    },
  ];

  const handleSelectLanguage = item => {
    i18n.changeLanguage(item.lng);
    dispatch(setLanguage(item.lng));
  };

  const Item = ({item}) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedLanguage === item.lng
          ? tw`border border-[#a9a9a9] p-0 rounded-2xl` // Apply conditional styling here
          : null,
      ]}
      onPress={() => handleSelectLanguage(item)}>
      <View style={styles.itemContent}>
        <Image
          source={item?.image}
          style={[tw`w-30 h-30 self-center`, {resizeMode: 'contain'}]}
        />
        <Text
          style={tw`text-[#fff] text-[18px] font-401 leading-tight self-center mb-2`}>
          {item?.title}
        </Text>
        {selectedLanguage === item.lng && (
          <View
            style={[tw`bg-[#435AE5] w-6 h-6 rounded-full`, styles.tickIcon]}>
            <AntDesign
              name="check"
              size={20}
              color="#fff"
              style={tw`self-center mt-0.5`}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`bg-[#05102E] h-full p-5`}>
      <Text style={tw`text-[#fff] text-[34px] font-401 leading-tight mt-5`}>
        {t('language')}
      </Text>
      <Text style={tw`text-[#A9A9A9] text-[16px] font-400 leading-tight mt-8`}>
        {t('chooseLangText')}
      </Text>
      <FlatList
        numColumns={2}
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('SplashScreen')}
        style={[
          tw`mt-8 mx-2 rounded-md justify-center self-center`,
          {
            width: '100%',
            height: 55,
          },
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            tw`rounded-xl justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
          {t('continue')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({
  item: {
    width: '50%',
    margin: 1,
    alignItems: 'center',
    borderRadius: 8,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  tickIcon: {
    position: 'absolute',
    top: -10,
    right: -30,
  },
  itemContent: {
    position: 'relative',
    alignItems: 'center',
  },
});
