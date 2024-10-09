import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import PostCard from '../../components/post/post-card'
import Loader from '../../components/loader/Loader'
import Header from '../../components/header/header'
import tw from '../../styles/tailwind'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { postHandler } from '../../redux/discussionSlice'

const Discussion = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const post = useSelector(state => state?.discussion?.postData);


  useEffect(() => {
dispatch(postHandler())
  }, [])


  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
            <Header name="Discussion" />
  {post?.length > 0 ?   <FlatList
      data={post}
      renderItem={({ item }) => <PostCard item={item} />}
      keyExtractor={(item) => item.id}
    />: <Loader/>}
    </View>
  )
}

export default Discussion

const styles = StyleSheet.create({})