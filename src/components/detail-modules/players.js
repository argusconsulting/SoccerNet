import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../../styles/tailwind'

const Players = () => {
  return (
    <View style={tw` m-5`}>
  <Image source={require('../../assets/footballField.png')} style={tw`h-200 w-full`}/>


    </View>
  )
}

export default Players

const styles = StyleSheet.create({})