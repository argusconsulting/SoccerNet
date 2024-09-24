import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/header/header'
import tw from '../../styles/tailwind'
import ScoreCard from '../../components/score-card/score-card'
import { matches } from '../../helpers/dummyData'

const Highlights = () => {

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Highlights" />
      <View style={tw``}>
      <FlatList
          data={matches}
          renderItem={({item}) => <ScoreCard match={item} width={'96%'} screen={'highlight'}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`px-3`}
        />
        </View>
    </View>
  )
}

export default Highlights

const styles = StyleSheet.create({})