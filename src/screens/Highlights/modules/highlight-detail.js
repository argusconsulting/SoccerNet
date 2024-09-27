import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Suspense, useState } from 'react'
import tw from '../../../styles/tailwind'
import Header from '../../../components/header/header'
import Summary from './summary'
import Statistics from './statistics'
import Standings from './standings'
import Players from './players'
import Commentary from './commentary'

const HighlightDetail = () => {

    const detailsType = [
        {
            id: 1,
            name: 'Summary',
        },
        {
            id: 2,
            name: 'Statistics',
        },
        {
            id: 3,
            name: 'Standings',
        },
        {
            id: 4,
            name: 'Players',
        },
        {
            id: 5,
            name: 'Commentary',
        },
    ];

    const [type, setType] = useState('Summary');

    const renderItem = ({ item }) => (
        <View style={tw``}>
            <TouchableOpacity
                style={[
                    tw`h-7`, 
                    { paddingHorizontal: 10},
                ]}
                onPress={() => setType(item.name)}
            >
                <Text
                    style={[
                        tw`text-[#fff] text-[18px] font-400 self-center`
                    ]}
                >
                    {item.name}
                </Text>
                {type === item.name && (
                    <View style={tw`border-b-2 border-[#fff] w-full  self-center`} />
                )}
            </TouchableOpacity>
        </View>
    );
    
    

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
     <Header name="" />

     <View style={[tw`  mt-2 mx-5`]}>
      <View style={tw`flex-row justify-between`}>
        <Image source={require('../../../assets/league_icons/league-1.png')} style={tw`w-5 h-5 mt-2 ml-3`} />
     <Text
          style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5`}>
          1 August 2023
        </Text>
       
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
         89"
        </Text>
      </View>
    
      <View style={tw`flex-row justify-between mx-12 mt-3`}>
        <View>
          <Image
            source={require('../../../assets/league_icons/league-2.png')}
            style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5 `}>
          Man United
          </Text>
        </View>
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 ml-3`}>
         1
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 `}>
          -
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
    3
        </Text>
        <View>
          <Image
            source={require('../../../assets/league_icons/league-3.png')}
            style={[tw`w-10 h-10 self-center`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-[#fff] text-[14px] font-400 leading-normal mt-1.5`}>
          Manchester
          </Text>
        </View>
      </View>
    </View>
    <View style={tw`flex-row self-center mt-5`}>
    <Text
          style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-31`}>
       R. Mahrez 57’ (Pen)
        </Text>
        <Image source={require('../../../assets/icons/football.png')} style={[tw`w-5 h-5 mt-2 mx-5`,{resizeMode:"contain"}]} />

        <Text
          style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-30`}>
       R. Mahrez 57’ (Pen)
        </Text>
        </View>
        <View style={tw`flex-row self-center mt-2`}>
    <Text
          style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-35`}>
  
        </Text>
        <Image source={require('../../../assets/icons/red-card.png')} style={[tw`w-5 h-5 mt-2 mx-5`,{resizeMode:"contain"}]} />

        <Text
          style={tw`text-[#a9a9a9] text-[16px] font-400 leading-normal self-center mt-1.5 w-35`}>
    Gabriel Magalhaes 59’
        </Text>
        </View>
<View>
<View
                                style={tw` border-t pt-3 ml-3 border-[#3e3e3e] mt-10 `}
                            />
    <FlatList
                                data={detailsType}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={tw`flex-row justify-between mx-3`}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                            />
                            <View
                                style={tw` border-b pt-3 ml-3 border-[#3e3e3e] `}
                            />
                            </View>

                           
                            <Suspense fallback={<Text>Loading...</Text>}>
                                {type === 'Summary' && (
                                <Summary/>
                                )}
                                {type === 'Statistics' && (
                                  <Statistics/>
                                )}
                                {type === 'Standings' && (
                                 <Standings/>
                                )}
                                {type === 'Players' && (
                                   <Players/>
                                )}
                                {type === 'Commentary' && (
                                  <Commentary/>
                                )}
                            </Suspense>
    </View>
  )
}

export default HighlightDetail

const styles = StyleSheet.create({})