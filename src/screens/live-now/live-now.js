import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import ScoreCard from '../../components/score-card/score-card';
import { useDispatch, useSelector } from 'react-redux';
import { getLiveScoresInPlay } from '../../redux/liveScoreSlice';
import SearchBar from '../../components/search-bar/search-bar';
import { t } from 'i18next';

const LiveNow = () => {
  const dispatch = useDispatch();
  const inPlayLiveScores = useSelector(
    state => state?.liveScore?.liveScoreInPlayData,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filteredScores, setFilteredScores] = useState([]);

  // Function to handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay for debouncing (you can adjust it)

    return () => clearTimeout(timer); // Cleanup timer on searchQuery change
  }, [searchQuery]);

  // Filter scores when debouncedSearchQuery changes
  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') {
      setFilteredScores(inPlayLiveScores?.data || []);
    } else {
      const filtered = inPlayLiveScores?.data?.filter(item =>
        item?.participants?.some(participant =>
          participant?.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      );
      setFilteredScores(filtered);
    }
  }, [debouncedSearchQuery, inPlayLiveScores?.data]);

  // Fetch live scores when the component mounts
  useEffect(() => {
    dispatch(getLiveScoresInPlay());
  }, [dispatch]);

  return (
    <SafeAreaView style={tw`bg-[#05102E] flex-1`}>
      <Header name="LiveNow" />
      <View style={tw`mx-5`}>
        <SearchBar
          onSearch={handleSearch}
          placeholderText={t('Search by team name')}
          value={searchQuery} // Bind the search input to state
        />
      </View>
      <ScrollView>
        {filteredScores?.length > 0 ? (
          <FlatList
            data={filteredScores}
            renderItem={({ item }) => (
              <ScoreCard
                match={item}
                width={'96%'}
                screen={'liveNow'}
                navigate={'LiveDetails'}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={tw`px-3`}
          />
        ) : (
          <Text
            style={tw`text-[#fff] text-[20px] font-401 leading-tight mt-5 self-center px-5`}>
            No Data Found !
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveNow;

const styles = StyleSheet.create({});
