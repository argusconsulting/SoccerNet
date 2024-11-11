import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPlayers} from '../../redux/playerSlice';

const PlayerInfo = ({participants}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.player?.allPlayers);
  console.log('participants', participants);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, []);

  return (
    <View style={tw`bg-[#303649] p-5 m-5`}>
      <View style={tw`flex-row justify-between`}>
        <Image
          source={{uri: data?.participants?.[0]?.image_path}}
          style={tw`w-8 h-8`}
        />
        <Text
          style={tw`text-[#fff] text-[20px] font-400 leading-normal self-center mb-4`}>
          Players
        </Text>
        <Image
          source={{uri: data?.participants?.[1]?.image_path}}
          style={tw`w-8 h-8`}
        />
      </View>
    </View>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({});
