import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {t} from 'i18next';
import { useSelector } from 'react-redux';

const Header = ({name}) => {
  const navigation = useNavigation();
  const lang = useSelector(state => state?.language_store?.language);

  return (
    <View style={tw` ${lang== 'ar' ? 'flex-row-reverse' : "flex-row"} p-5 `}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name={'arrowleft'}
          size={24}
          color={'#fff'}
          style={tw`mx-3 mt-1`}
        />
      </TouchableOpacity>
      <Text
        style={tw`text-[#fff] text-[24px] font-401 leading-normal self-center `}>
        {t(name)}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
