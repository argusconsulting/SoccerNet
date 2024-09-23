import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../../styles/tailwind';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({name}) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-row p-5 `}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name={'arrowleft'}
          size={24}
          color={'#fff'}
          style={tw`mr-3 mt-1`}
        />
      </TouchableOpacity>
      <Text
        style={tw`text-[#fff] text-[24px] font-401 leading-normal self-center `}>
        {name}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
