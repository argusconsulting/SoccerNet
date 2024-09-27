import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Suspense, useState } from 'react'
import Header from '../../../components/header/header'
import tw from '../../../styles/tailwind'
import Commentary from '../../../components/detail-modules/commentary'

const LiveDetails = () => {

    const detailsType = [
      
    
        {
            id: 1,
            name: 'Commentary',
        },
        {
            id: 2,
            name: 'Standings',
        },
        {
            id: 3,
            name: 'News',
        },
    ];

    const [type, setType] = useState('Commentary');

    const renderItem = ({ item }) => (
        <View style={tw``}>
            <TouchableOpacity
                style={[
                    tw`h-7`, 
                    { paddingHorizontal: 20},
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
         style={tw`text-red-500 text-[16px] font-401 leading-normal mt-1.5 mr-3`}>
        Live
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
                          
                               {type === 'Standings' && (
                         <Text>gdf</Text>
                               )}
                               {type === 'News' && (
                      <Text>gdf</Text>
                               )}
                               {type === 'Commentary' && (
                           <Commentary/>
                               )}
                           </Suspense>
   </View>
  )
}

export default LiveDetails

const styles = StyleSheet.create({})