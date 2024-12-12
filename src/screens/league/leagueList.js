import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../../styles/tailwind';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getAllLeaguesWithFixtures} from '../../redux/leagueSlice';
import {getSeasonsById} from '../../redux/playerSlice';
import Loader from '../../components/loader/Loader';

const LeagueScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [expandedItem, setExpandedItem] = useState(null);
  const dispatch = useDispatch();
  const allLeagues = useSelector(state => state?.league?.allLeagueData);
  const lang = useSelector(state => state?.language_store?.language);
  const seasons = useSelector(state => state?.player?.allSeasons);
  const loading = useSelector(state => state?.player?.isLoading);

  useEffect(() => {
    dispatch(getAllLeaguesWithFixtures({lang}));
  }, [dispatch, lang]);

  useEffect(() => {
    if (route.params?.seasonId) {
      setExpandedItem(route.params.seasonId);
      dispatch(getSeasonsById(route.params.seasonId));
    }
  }, [route.params?.seasonId, dispatch]);

  const toggleItem = seasonId => {
    setExpandedItem(expandedItem === seasonId ? null : seasonId); 
    if (expandedItem !== seasonId) {
      dispatch(getSeasonsById(seasonId)); 
    }
  };

  const Item = ({item}) => {
    const currentSeasonId = item.currentseason?.id;
    const seasonData = seasons?.[currentSeasonId]; 
    const fixtures = seasonData?.fixtures || [];

    return (
      <View style={tw`bg-[#303649] mb-5 p-3 rounded-lg`}>
        <TouchableOpacity
          style={tw`flex-row justify-between`}
          onPress={() => toggleItem(currentSeasonId)}>
          <View style={tw`flex-row`}>
            <Image
              source={{uri: item?.image_path}}
              style={[tw`w-8 h-8 mr-5`, {resizeMode: 'contain'}]}
            />
            <Text
              style={tw`text-[#fff] text-[18px] font-401 leading-normal mt-0.5`}>
              {item?.name}
            </Text>
          </View>
          <AntDesign
            name={expandedItem === currentSeasonId ? 'caretup' : 'caretdown'}
            size={15}
            color={'#fff'}
            style={tw`mt-1`}
          />
        </TouchableOpacity>

        {/* Display season name and fixtures when item is expanded */}
        {expandedItem === currentSeasonId && (
          <>
            {loading ? (
              <Loader />
            ) : fixtures.length > 0 ? (
              fixtures.map((fixture, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('HighlightDetail', {
                      fixtureId: fixture?.id,
                    })
                  }
                  key={index}
                  style={tw`mt-5 border-b-[#a2a2a2] border-b-[1px] w-full`}>
                  <View style={tw`flex-row items-center self-center`}>
                    {fixture.participants.map((participant, idx) => (
                      <React.Fragment key={participant.id}>
                        <View style={tw`flex-row  self-center`}>
                          <Image
                            source={{uri: participant?.image_path}}
                            style={[tw`w-8 h-8`, {resizeMode: 'contain'}]}
                          />
                          <Text
                            style={tw`text-[#a2a2a2] text-[20px] self-center font-400 mx-2`}>
                            {participant?.name}
                          </Text>
                        </View>
                        {/* Only display "vs" if it’s not the last participant */}
                        {idx < fixture.participants.length - 1 && (
                          <Text style={tw`text-[#a2a2a2] text-[20px] mx-2`}>
                            vs
                          </Text>
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                  <Text
                    style={tw`text-[#a2a2a2] text-[16px] self-center mt-2 mb-2`}>
                    {fixture.starting_at}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={tw`text-[#fff] text-[18px] font-400 mt-1 self-center`}>
                No fixtures available...
              </Text>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={tw`bg-[#05102E] h-full p-5`}>
      <View style={tw`flex-row mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'arrowleft'}
            size={24}
            color={'#fff'}
            style={tw`mt-2`}
          />
        </TouchableOpacity>
        <Text style={tw`text-[#fff] text-[26px] font-401 leading-normal mx-5`}>
          League
        </Text>
      </View>

      <FlatList
        data={allLeagues?.data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LeagueScreen;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
