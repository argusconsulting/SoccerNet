import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import axios from 'axios';
import tw from '../../styles/tailwind';
import VideoEmbed from '../../components/videoEmbed';

const VideoHighlights = () => {
  const [videos, setVideos] = useState([]);

  const apiHandler = async () => {
    try {
      const response = await axios.get('https://www.scorebat.com/video-api/v3');
      setVideos(response.data.response); // Adjust according to API structure
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    apiHandler();
  }, []);

  const renderVideo = ({item}) => (
    <View style={tw`mb-5`}>
      <Text style={tw`text-white text-lg font-bold mb-2`}>{item.title}</Text>
      <VideoEmbed embed={item.videos[0].embed} />
    </View>
  );

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="Video Highlights" />
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`p-3`}
      />
    </View>
  );
};

export default VideoHighlights;

const styles = StyleSheet.create({});
