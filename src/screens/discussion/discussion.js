import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostCard from '../../components/post/post-card'
import { postData } from '../../helpers/dummyData'
import Loader from '../../components/loader/Loader'
import Header from '../../components/header/header'
import tw from '../../styles/tailwind'

const Discussion = () => {
  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
            <Header name="Discussion" />
  {postData?.length > 0 ?   <FlatList
      data={postData}
      renderItem={({ item }) => <PostCard item={item} />}
      keyExtractor={(item) => item.id}
    />: <Loader/>}
    </View>
  )
}

export default Discussion

const styles = StyleSheet.create({})