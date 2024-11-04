import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getAllStandings} from '../../redux/standingSlice';

const Standings = () => {
  const dispatch = useDispatch();
  const standingData = useSelector(state => state?.standing?.standingsData);

  useEffect(() => {
    dispatch(getAllStandings());
  }, [dispatch]);

  // Sort the standingData in ascending order based on item.position
  const sortedStandings = standingData?.data
    ?.slice()
    .sort((a, b) => a.position - b.position);

  // Update the Item component to display the index
  const Item = ({item, index}) => {
    return (
      <View style={tw`flex-row justify-between py-2 items-center`}>
        {/* Show the index + 1 to make the count start from 1 */}
        <Text style={tw`text-white text-[14px]`}>{index + 1}</Text>
        <View style={tw`flex-row w-30`}>
          <Image
            source={{uri: item?.participant?.image_path}}
            style={[tw`w-4 h-4 mr-2 self-center`, {resizeMode: 'contain'}]}
          />
          <Text style={tw`text-white text-[14px] self-center`}>
            {item.participant?.name}
          </Text>
        </View>
        <Text style={tw`text-white text-[14px] self-center`}>{item.match}</Text>
        <Text style={tw`text-white text-[14px] self-center`}>{item.wins}</Text>
        <Text style={tw`text-white text-[14px] self-center`}>{item.draw}</Text>
        <Text style={tw`text-white text-[14px] self-center`}>{item.loose}</Text>
        <Text style={tw`text-white text-[14px] self-center`}>{item.goals}</Text>
        <Text style={tw`text-white text-[14px] self-center`}>
          {item.points}
        </Text>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#303649] p-5 m-5`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          #
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center w-23`}>
          Team
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          M
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          W
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          D
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          L
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          G
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-400 leading-normal self-center`}>
          PTS
        </Text>
      </View>

      <FlatList
        data={sortedStandings}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Standings;

const styles = StyleSheet.create({});
