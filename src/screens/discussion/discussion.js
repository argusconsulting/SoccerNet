import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PostCard from '../../components/post/post-card';
import Loader from '../../components/loader/Loader';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {postHandler} from '../../redux/discussionSlice';

const Discussion = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const post = useSelector(state => state?.discussion?.postData);
  const isLoading = useSelector(state => state?.discussion?.isLoading);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(postHandler());
    });
    return willFocusSubscription;
  }, [dispatch]);

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Discussion" />
      {isLoading ? (
        <Loader /> // Show loader while data is being fetched
      ) : post?.length > 0 ? (
        <FlatList
          data={post}
          renderItem={({item}) => <PostCard item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text
          style={[
            tw`text-[#fff] text-[18px] font-401 leading-normal mt-3 self-center justify-center`,
            {textAlign: 'center'},
          ]}>
          No data found!
        </Text>
      )}
    </View>
  );
};

export default Discussion;

const styles = StyleSheet.create({});
