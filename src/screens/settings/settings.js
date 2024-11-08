import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {t} from 'i18next';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Settings" />

      <TouchableOpacity
        activeOpacity={0.7}
        style={tw`mt-5 py-3 flex-row justify-between items-center bg-[#303649]`}
        onPress={() =>
          navigation.navigate('LanguageSelection', {from: 'Settings'})
        }>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center mx-8`}>
          <View>
            <Text style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
              {t('languageText')}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ChangePassword')}
        activeOpacity={0.7}
        style={tw`mt-5 py-3 flex-row justify-between items-center bg-[#303649] mt-5`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center mx-8`}>
          <View>
            <Text style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
              {t('ChangePassword')}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={tw`mt-5 py-3 flex-row justify-between items-center bg-[#303649] mt-5`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center mx-8`}>
          <View>
            <Text style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
              {t('privacyPolicy')}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={tw`mt-5 py-3 flex-row justify-between items-center bg-[#303649] mt-5`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center mx-8`}>
          <View>
            <Text style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
              {t('termsOfUse')}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={tw`mt-5 py-3 flex-row justify-between items-center bg-[#303649] mt-5`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center mx-8`}>
          <View>
            <Text style={tw`text-[#fff] text-[18px] font-401 leading-normal`}>
              {t('support')}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
