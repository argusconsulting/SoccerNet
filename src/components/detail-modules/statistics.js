import React, {useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getFixturesById, getTypeById} from '../../redux/fixturesSlice';
import tw from '../../styles/tailwind';

const Statistics = ({fixtureId}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.fixtures?.fixturesById);
  const typeNames = useSelector(state => state?.fixtures?.typeNames);
  const loading = useSelector(state => state?.fixtures?.loading);

  useEffect(() => {
    dispatch(getFixturesById(fixtureId));

    // Extract unique type IDs
    const uniqueTypeIds = [
      ...new Set(data?.statistics?.map(stat => stat.type_id)),
    ];

    // Fetch type names for each unique type ID
    uniqueTypeIds.forEach(typeId => {
      dispatch(getTypeById(typeId));
    });
  }, [dispatch, fixtureId]);

  // Remove duplicate stats by `type_id`
  const uniqueStatistics = Array.from(
    new Map(data?.statistics?.map(stat => [stat.type_id, stat])).values(),
  );

  const renderItem = ({item}) => {
    const typeInfo = typeNames?.[item.type_id];
    const typeName = typeInfo ? typeInfo.name : 'Loading...';

    // Find the home and away values
    const homeStat = data?.statistics.find(
      stat =>
        stat.participant_id === data?.participants[0]?.id &&
        stat.type_id === item.type_id,
    );
    const awayStat = data?.statistics.find(
      stat =>
        stat.participant_id === data?.participants[1]?.id &&
        stat.type_id === item.type_id,
    );

    return (
      <View
        style={tw`flex-row items-center justify-between py-3 px-4 mb-3 bg-[#424a5a] rounded-lg`}>
        {/* Home Value */}
        <Text style={tw`text-white text-[16px] font-bold`}>
          {homeStat?.data.value || 0}
        </Text>

        {/* Stat Type with Icon */}
        <View style={tw`flex-row items-center justify-center flex-1`}>
          <Text style={tw`text-[#f0f0f0] text-[14px] font-semibold`}>
            {typeName}
          </Text>
        </View>

        {/* Away Value */}
        <Text style={tw`text-white text-[16px] font-bold`}>
          {awayStat?.data.value || 0}
        </Text>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#303649] p-5 m-5 rounded-lg shadow-md`}>
      {/* Header Section */}
      <View style={tw`flex-row justify-between items-center mb-5`}>
        <Image
          source={{uri: data?.participants?.[0]?.image_path}}
          style={tw`w-10 h-10 rounded-full`}
        />
        <Text
          style={tw`text-[#fff] text-[20px] font-bold leading-normal self-center`}>
          TEAM STATS
        </Text>
        <Image
          source={{uri: data?.participants?.[1]?.image_path}}
          style={tw`w-10 h-10 rounded-full`}
        />
      </View>

      {/* List Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {/* Column Titles */}
          <View
            style={tw`flex-row justify-between px-4 pb-2 border-b border-gray-600`}>
            <Text style={tw`text-white text-[14px] font-bold`}>Home</Text>
            <Text style={tw`text-white text-[14px] font-bold`}>Statistics</Text>
            <Text style={tw`text-white text-[14px] font-bold`}>Away</Text>
          </View>
          {uniqueStatistics.length > 0 ? (
            <FlatList
              data={uniqueStatistics}
              renderItem={renderItem}
              keyExtractor={item => item.type_id.toString()}
              contentContainerStyle={tw`pt-4`}
            />
          ) : (
            <Text style={tw`text-white text-[24px] font-401 self-center my-10`}>
              No Statistics Found !
            </Text>
          )}
          {/* Statistics */}
        </>
      )}
    </View>
  );
};

export default Statistics;
