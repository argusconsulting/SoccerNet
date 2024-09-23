import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';

const Profile = () => {
  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Profile" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
