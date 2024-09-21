import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import tw from '../../styles/tailwind';


export default function SearchBar({ onSearch }) {


    return (
        <>
  
          

                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Search ..."
                        placeholderTextColor={'#888888'}
                        onChangeText={onSearch}
                        // onChangeText={handleSearchInputChange}
                        // value={searchInput}
                    />
                    <View >
                      
                            <TouchableOpacity
                           
                            >
                                 <AntDesign
                                name={'search1'}
                                color={'#8D8E90'}
                                size={22}
                                style={tw`mt-2`}
                            />
                            </TouchableOpacity>
               
                    </View>
                </View>
           
        
        </>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        fontSize: 16,
        width: '91%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        color: '#b3b3b3',
        marginBottom: 10,
        height: 42,
        paddingHorizontal: 10,
        marginHorizontal: 17,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 30,
        marginTop: 15,
    },
    marginTop05: {
        marginTop: 5,
    },
    inputText: {
        color: '#000',
        fontSize: 14,
        paddingVertical: Platform.OS == 'ios' ? 4 : 2,
        paddingLeft: 5,
        width: '90%',
    },
});
