import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, TextInput, View} from 'react-native';
import tw from '../../styles/tailwind';

export default function SearchBar({onSearch}) {
  return (
    <>
      <View style={[tw`flex-row`, styles.searchInput]}>
        <AntDesign
          name={'search1'}
          size={16}
          color={'#999'}
          style={tw`mt-2 mr-3`}
        />
        <TextInput
          style={tw`text-[#fff]`}
          placeholder="Search..."
          placeholderTextColor="#a9a9a9"
          onChangeText={text => {
            console.log('TextInput value:', text); // Log the value entered
            onSearch(text); // Pass the value to the parent component
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
    paddingVertical: 1,
    paddingHorizontal: 25,
    marginBottom: 15,
    fontSize: 14,
    height: 40,
  },
});
