import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import Header from '../header/header';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayersById} from '../../redux/playerSlice';

const PlayerInfo = () => {
  const route = useRoute();
  const playerId = route?.params?.playerId;
  const data = useSelector(state => state?.player?.playerData);
  const dispatch = useDispatch();

  console.log('datattttttttttttttttt', data);

  useEffect(() => {
    dispatch(getPlayersById(playerId));
  }, []);

  return (
    <View style={tw`bg-[#05102E] flex-1`}>
      <Header name="" />
      <Image
        source={{uri: data?.image_path}}
        style={tw`w-15 h-15 mr-2 rounded-full self-center`}
      />
      <Text
        style={tw`text-[#fff] text-[24px] self-center font-401 leading-normal mt-2`}>
        {data?.display_name}
      </Text>
      <Text
        style={tw`text-[#a9a9a9] text-[20px] self-center font-401 leading-normal `}>
        {data?.position?.name}
      </Text>
      <View style={tw`bg-[#a9a9a9] w-90 mt-3 mx-5 rounded-md py-5`}>
        <Image
          source={{uri: data?.country?.image_path}}
          style={tw`w-15 h-15 mr-2 rounded-full self-center `}
        />
        <Text
          style={tw`text-[#fff] text-[24px] font-401 self-center leading-normal mt-2`}>
          {data?.country?.name}
        </Text>

        <View style={tw`flex-row justify-between mx-5`}>
          <View>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal mt-2`}>
              Date of Birth
            </Text>
            <Text
              style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-2`}>
              {data?.date_of_birth}
            </Text>
          </View>

          <View>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal mt-2`}>
              Height
            </Text>
            <Text
              style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-2`}>
              {data?.height}
            </Text>
          </View>

          <View>
            <Text
              style={tw`text-[#fff] text-[20px] font-401 leading-normal mt-2`}>
              Gender
            </Text>
            <Text
              style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-2`}>
              {data?.gender}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({});
