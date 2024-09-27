import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../../styles/tailwind'
import Header from '../../components/header/header'
import ScoreCard from '../../components/score-card/score-card'
import { matches } from '../../helpers/dummyData'

const LiveNow = () => {

  return (
   <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Live Now" />
      <View style={tw``}>
      <FlatList
          data={matches}
          renderItem={({item}) => <ScoreCard match={item} width={'96%'} screen={'liveNow'} navigate={'LiveDetails'}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`px-3`}
        />
        </View>
    </View>
  )
}

export default LiveNow

const styles = StyleSheet.create({})