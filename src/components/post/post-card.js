import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import tw from '../../styles/tailwind';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import TextInput from '../library/text-input';
import Loader from '../loader/Loader';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { createComments, getComments } from '../../redux/discussionSlice';

const PostCard = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(item?.is_liked);
  // const [commentCount, setCoCount] = useState(item?.likes_count);
    const [modalVisible, setModalVisible] = useState(false);
    const userId = useSelector(state => state.auth_store.userID);
    const commentsList = useSelector(state => state?.discussion?.commentsData);
    const sendLoader = useSelector(state => state?.discussion?.sendLoader);
    const getCommentsLoader = useSelector(
      state => state?.discussion?.getCommentsLoader,
    );

    const commentsCount = item?.comments_count


    function handleComment() {
      const reqData = {
        post_id: item?.id,
        user_id: userId,
        content: comment,
      };
      dispatch(createComments({reqData})).then(res => {
        if (res?.payload?.status === 201) {
          dispatch(getComments({post_id: item?.id}));
          setComment('');
        } else {
          console.log('Error comment', res?.payload);
        }
      });
    }

    const toggleModal = postId => {
      dispatch(getComments({post_id: postId}));
      setModalVisible(!modalVisible);
    };

  const customStyles = {
    body: tw`text-[#fff] text-[14px] leading-tight mx-1 mt-3 w-80`,
    p: tw`text-[#fff]`, // Style for <p> tags
  };

    const Item = ({items}) => {
      return (
        <View style={tw`mx-5 mt-6`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                // navigation.navigate('UserProfileDetail',{
                //   details: items?.user
                // });
              }}>
              <Image
                source={
                  items?.user?.avatar_url
                    ? {uri: items?.user?.avatar_url}
                    : require('../../assets/icons/user.png')
                }
                style={[tw`w-10 h-10 rounded-full mr-2`,{resizeMode:"contain"}]}
              />
            </TouchableOpacity>

            <View>
              <Text
                style={[tw`text-[#fff] text-[15px] font-401 mx-1 leading-tight`,{textTransform:"capitalize"}]}>
                {items?.user?.name}
              </Text>
              <Text
                style={tw`text-[#fff] text-[14px] font-400 mx-1 mt-1 leading-tight`}>
                {items?.content}
              </Text>
            </View>
          </View>
     
        </View>
      );
    };

  return (
    <View
      style={[
        tw`mx-2 w-85  self-center bg-[#303649] rounded-lg my-2`,
        styles.elevation,
      ]}>
      {/* <View style={tw`flex-row items-center`}>
        <Image
          source={{uri: item?.user?.avatar_url}}
          style={tw`w-7 h-7 rounded-lg`}
        />
        <View>
          <Text
            colors={'#E42B12'}
            style={[
              tw`text-[16px] font-401 mx-5 mt-1 leading-tight`,
              {textTransform: 'capitalize'},
            ]}>
            {item?.user?.name}
          </Text>

          <Text
            style={tw`text-[#3b3b3b] text-[12px] font-400 mx-1 mt-1 mx-5 leading-tight w-85`}>
            {formattedDate}
            {'   '}
            {formattedTime}
          </Text>
        </View>
      </View> */}

      <Image
        source={{uri: item?.image}}
        style={[tw`w-full h-50  rounded-lg`, {resizeMode: 'contain'}]}
      />
      <View style={tw`px-2`}>
        <RenderHtml
          contentWidth={80}
          source={{html: item.content}}
          tagsStyles={customStyles}
        />

        <View style={tw`flex-row justify-between mt-2`}>
          <Text
            style={tw`text-[#fff] text-[13px] font-400 mx-1 mt-1 leading-tight`}>
            {commentsCount}{' '} Comments
          </Text>
        </View>

        <View style={tw`border-t border-[#d3d3d3] mt-4`} />
        <View style={tw`flex-row justify-between my-3 mx-1`}>
          <TouchableOpacity
            style={tw`flex-row`}
            onPress={() => toggleModal(item?.id)}>
            <FontAwesome
              name={'comment-o'}
              size={20}
              color={'#a2a2a2'}
              style={tw`mr-2`}
            />
            <Text
              style={tw`text-[#fff] text-[15px] font-400 mx-1 mt-1 leading-tight`}>
              Comment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row`}>
            <FontAwesome
              name={'share'}
              size={20}
              color={'#a2a2a2'}
              style={tw`mr-2`}
            />
            <Text
              style={tw`text-[#fff] text-[15px] font-400 mx-1 mt-1 leading-tight`}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={tw`flex-1 bg-[#303649] rounded-md`}>
          <View style={styles.messageContainer}>
            <View style={[tw`flex-row justify-between items-center px-5 pt-3`]}>
              <Text style={styles.messageTitle}>Comments</Text>
              <TouchableOpacity onPress={() => toggleModal(item?.id)}>
                <AntDesign
                  name={'close'}
                  size={24}
                  color={'#fff'}
                  style={tw`mr-2`}
                />
              </TouchableOpacity>
            </View>
            {getCommentsLoader ? (
              <Loader />
            ) : commentsList?.comments?.length > 0 ? (
              <FlatList
                style={{flex: 1}}
                data={commentsList?.comments}
                renderItem={({item}) => <Item items={item} />}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={tw`flex-1 justify-center`}>
                <Text
                  style={tw`text-[#3b3b3b] text-[15px] font-400 mx-1 mt-1 leading-tight self-center`}>
                  No Comments Found!
                </Text>
              </View>
            )}

            <View style={{justifyContent: 'flex-end'}}>
              <View
                style={tw`flex-row justify-between border-t border-[#d3d3d3] px-3 py-2 mt-5`}>
                <TextInput
                  style={tw` text-[13px] rounded-md p-2 h-8 w-75 text-[#fff]`}
                  placeholder="Add your comment here!"
                  placeholderTextColor="#a2a2a2"
                  value={comment}
                  onChangeText={text => setComment(text)}
                />

                <TouchableOpacity onPress={() => handleComment()}>
                  {sendLoader ? (
                    <Loader />
                  ) : (
                    <FontAwesome
                      name={'send'}
                      size={24}
                      color={'#a2a2a2'}
                      style={tw`ml-2 mt-1`}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  elevation: {
    elevation: 5,
    shadowColor: '#7d7d7d',
    // marginBottom:40
  },
  messageContainer: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});
