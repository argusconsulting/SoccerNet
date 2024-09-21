import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../../styles/tailwind'

const Loader = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
       <ActivityIndicator style={tw` self-center`} size="large" color="#EB6707" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})