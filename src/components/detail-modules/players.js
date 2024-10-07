import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../../styles/tailwind'

const Players = () => {
  return (
    <View style={tw` m-5`}>
  <ImageBackground source={require('../../assets/footballField.png')} style={tw`h-200 w-full`}>
  <View style={tw`flex-row mt-2 mx-2 justify-between`}>
   <View style={tw`flex-row`}>
  <Image source={require('../../assets/league_icons/league-2.png')} style={[tw`w-7 h-7 ml-3`,{resizeMode:"contain"}]}/>
  <Text
        style={tw`text-[#fff] text-[20px] font-401 leading-normal ml-5 `}>
        Man United
      </Text>
      </View>
      <View>
      <Text
        style={tw`text-[#fff] text-[20px] font-401 leading-normal mr-3 `}>
     4-2-3-1
      </Text>
      </View>
      </View>

     

    
      <View style={tw`bg-red-600 w-8 h-8 rounded-full self-center top-5 justify-center border-[#fff] border-[0.8px]`}>
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal self-center`}>
     32
      </Text>
     
      </View>
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal self-center top-4.5`}>
     A.RamsDale
      </Text>





      <View style={tw`flex-row justify-evenly mt-6`}>
        <View>
      <View style={tw`bg-red-600 w-8 h-8 rounded-full self-center top-5 justify-center border-[#fff] border-[0.8px]`}>
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal self-center`}>
     32
      </Text>
     
      </View>
      <Text
        style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center top-4.5`}>
     A.RamsDale
      </Text>
      </View>

<View>
      <View style={tw`bg-red-600 w-8 h-8 rounded-full self-center top-5 justify-center border-[#fff] border-[0.8px]`}>
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal self-center`}>
     32
      </Text>
     
      </View>
      <Text
        style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center top-4.5`}>
     AT.Tomiyasu
      </Text>
      </View>

<View>
       <View style={tw`bg-red-600 w-8 h-8 rounded-full self-center top-5 justify-center border-[#fff] border-[0.8px]`}>
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal self-center`}>
     32
      </Text>
     
      </View>
      <Text
        style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center top-4.5`}>
     A.White
      </Text>
      </View>

<View>
      <View style={tw`bg-red-600 w-8 h-8 rounded-full self-center top-5 justify-center border-[#fff] border-[0.8px]`}>
      <Text
        style={tw`text-[#fff] text-[18px] font-401 leading-normal self-center`}>
     32
      </Text>
     
      </View>
      <Text
        style={tw`text-[#fff] text-[16px] font-401 leading-normal self-center top-4.5`}>
     Garbiel
      </Text>
      </View>
      </View>
  </ImageBackground>


    </View>
  )
}

export default Players

const styles = StyleSheet.create({})