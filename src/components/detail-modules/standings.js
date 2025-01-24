import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {getAllStandings} from '../../redux/standingSlice';
import { t } from 'i18next';
import Loader from '../loader/Loader';

const Standings = ({homeTeam , awayTeam}) => {
  console.log("homeTeam", homeTeam)
  const dispatch = useDispatch();
  const standingData = useSelector(state => state?.standing?.standingsData);
  const lang = useSelector(state => state?.language_store?.language);

  const [page, setPage] = useState(1); // Track the current page
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = 10;


  useEffect(() => {
    fetchStandingsData(page);
  }, [page]);

  const fetchStandingsData = async (currentPage) => {
    console.log("cur", currentPage)
    setIsLoading(true);
    await dispatch(getAllStandings({lang, currentPage}));
    setIsLoading(false);
  };



  // Sort the standingData in ascending order based on item.position
  const sortedStandings = standingData?.data
    ?.slice()
    .sort((a, b) => a.position - b.position);

    const highlightStyle = tw`bg-yellow-200`;

  // Update the Item component to display the index
  const Item = ({item, index}) => {
    const overallGoals = item?.details?.find(
      e => e?.type?.code === 'overall-goals-against',
    )?.value;

    const overallPlayed = item?.details?.find(
      e => e?.type?.code === 'overall-matches-played',
    )?.value;

    const overallDraw = item?.details?.find(
      e => e?.type?.code === 'overall-draw',
    )?.value;

    const overallWon = item?.details?.find(
      e => e?.type?.code === 'overall-won',
    )?.value;

    const overallLost = item?.details?.find(
      e => e?.type?.code === 'overall-lost',
    )?.value;

    const isHighlighted = homeTeam?.name === item?.participant?.name;
    const isAwayHighlighted = awayTeam?.name === item?.participant?.name;

    return (
      <View  style={[
        tw`flex-row justify-between py-2 items-center`,
        isHighlighted
        ? tw`bg-gray-500 px-2 rounded-lg`  // Home team highlighted
        : isAwayHighlighted
        ? tw`bg-gray-500 px-2 rounded-lg` // Away team highlighted
        : tw`bg-transparent`, // Default background
       
      ]}>
        {/* Show the index + 1 to make the count start from 1 */}
        <Text style={tw`text-white text-[14px]`}>{index + 1}</Text>
        <View style={tw`flex-row w-20  ml--2`}>
          <Image
            source={{uri: item?.participant?.image_path}}
            style={[tw`w-4 h-4 mr-2 self-center`, {resizeMode: 'contain'}]}
          />
          <Text style={tw`text-white text-[14px] self-center`}>
            {item.participant?.name}
          </Text>
        </View>
        <Text style={tw`text-white text-[14px] self-center`}>
          {overallPlayed}
        </Text>
        <Text style={tw`text-white text-[14px] self-center`}>{overallWon}</Text>
        <Text style={tw`text-white text-[14px] self-center`}>
          {overallDraw}
        </Text>
        <Text style={tw`text-white text-[14px] self-center`}>
          {overallLost}
        </Text>
        <Text style={tw`text-white text-[14px] self-center`}>
          {overallGoals}
        </Text>
        <Text style={tw`text-white text-[14px] self-center`}>
          {item.points}
        </Text>
      </View>
    );
  };

  const renderPagination = () => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <>
      <View style={[tw`border-t-[1px] mb-3`, { borderTopColor: '#fff' }]} />
      <FlatList
        data={pages}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
     
          <TouchableOpacity
            onPress={() => setPage(item)}
            style={[
              tw`px-4 py-2 m-1 rounded`,
              item === page ? tw`bg-blue-500` : tw`bg-gray-500`,
            ]}
          >
            <Text style={tw`text-white`}>{item}</Text>
          </TouchableOpacity>
      
        )}
      />
      </>
    );
  };

  return (
    <View style={tw`bg-[#303649] py-5 px-3 m-5`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          #
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center w-19`}>
          {t('Team')}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          {t('M')}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          {t('W')}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          {t('D')}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          {t('L')}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          {t('G')}
        </Text>
        <Text
          style={tw`text-[#fff] text-[16px] font-402 leading-normal self-center`}>
          {t('PTS')}
        </Text>
      </View>

      <FlatList
  data={sortedStandings}
  renderItem={({ item, index }) => <Item item={item} index={index} />}
  keyExtractor={(item, index) => `${item.key}-${index}`}
/>

<View style={tw`mt-4`}>
        {renderPagination()}
      </View>
    </View>
  );
};

export default Standings;

const styles = StyleSheet.create({});
