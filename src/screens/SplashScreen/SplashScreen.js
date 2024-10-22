import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import GradientButton from '../../components/gradient-button/gradient-button';
import BottomSheetModal from '../../components/bottom-sheet-modal/bottomSheetModal';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import FacebookLogin from '../../components/facebook-login';

const SplashScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const {i18n, t} = useTranslation();

  useEffect(() => {
    const loadStoredLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      // console.log('value of saved lang', savedLanguage);
    };

    loadStoredLanguage();
  }, []);

  const btnHandler = () => {
    setValue('SignUp');
    setModalVisible(true);
  };

  return (
    <View style={tw`bg-[#12122A] flex-1 p-5`}>
      <Image
        source={require('../../assets/logo_name.png')}
        style={[tw`w-40 h-20 self-center mb-3`, {resizeMode: 'contain'}]}
      />
      <Image
        source={require('../../assets/spalsh-screen.png')}
        style={[tw`w-full h-95`, {resizeMode: 'contain'}]}
      />
      <Text style={tw`text-white text-[36px] font-401 leading-tight  mt-1`}>
        {t('discoverSport')}
      </Text>

      <Text
        style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight mt-5 mb-3`}>
        {t('splashDesc')}{' '}
      </Text>

      <View style={tw`flex-row mt-5`}>
        <TouchableOpacity
          onPress={btnHandler}
          style={[
            tw`mt-1 rounded-xl justify-center `,
            {
              width: '45%',
              height: 55,
              alignSelf: 'center',
            },
          ]}>
          <LinearGradient
            colors={['#6A36CE', '#2575F6']}
            start={{x: 0, y: 0}} // Start from top left
            end={{x: 1, y: 1}} // End at bottom right
            style={[
              tw`rounded-xl justify-center`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
              {t('freeSignUp')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setValue('Login');
            setModalVisible(true);
          }}
          style={tw`border-[#435AE5] border-[1px] w-39 h-14 mt-1 ml-5 rounded-xl justify-center`}>
          <Text
            style={tw`text-white text-[20px] font-401 leading-tight self-center`}>
            {t('Login')}
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        selectedValue={value}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
