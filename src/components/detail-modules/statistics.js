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
      <View style={tw`flex-row justify-between py-2 mx-3`}>
        <Text style={tw`text-white text-[16px]`}>
          {homeStat?.data.value || 0}
        </Text>
        {/* Home value */}
        <Text style={tw`text-white text-[16px]`}>{typeName}</Text>
        {/* Type name */}
        <Text style={tw`text-white text-[16px]`}>
          {awayStat?.data.value || 0}
        </Text>
        {/* Away value */}
      </View>
    );
  };

  return (
    <View style={tw`bg-[#303649] p-5 m-5`}>
      <View style={tw`flex-row justify-between`}>
        <Image
          source={{uri: data?.participants?.[0]?.image_path}}
          style={tw`w-8 h-8`}
        />
        <Text
          style={tw`text-[#fff] text-[20px] font-400 leading-normal self-center mb-4`}>
          TEAM STATS
        </Text>
        <Image
          source={{uri: data?.participants?.[1]?.image_path}}
          style={tw`w-8 h-8`}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={data?.statistics}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Statistics;
