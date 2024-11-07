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
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllLeagues,
  getAllLeaguesWithFixtures,
} from '../../redux/leagueSlice';

const LeagueScreen = () => {
  const navigation = useNavigation();
  const [expandedItem, setExpandedItem] = useState(null);
  const dispatch = useDispatch();
  const allLeagues = useSelector(state => state?.league?.allLeagueData);
  const lang = useSelector(state => state?.language_store?.language);

  console.log('allLeGUES', allLeagues);

  useEffect(() => {
    dispatch(getAllLeaguesWithFixtures({lang}));
  }, []);

  const toggleItem = id => {
    setExpandedItem(prevState => (prevState === id ? null : id));
  };

  const Item = ({item}) => (
    <View style={tw`bg-[#303649] mb-5 p-3 rounded-lg`}>
      <TouchableOpacity
        style={tw`flex-row justify-between`}
        onPress={() => toggleItem(item.id)}>
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
          name={expandedItem === item.id ? 'caretup' : 'caretdown'}
          size={15}
          color={'#fff'}
          style={tw`mt-1`}
        />
      </TouchableOpacity>

      {expandedItem === item.id && (
        <>
          {item?.upcoming?.length > 0 ? (
            item?.upcoming?.map((e, index) => (
              <View key={index} style={tw`mt-3`}>
                <View style={tw`flex-row self-center`}>
                  <Text
                    style={tw`text-[#fff] text-[18px] font-400 leading-normal mt-0.5`}>
                    {e?.name}
                  </Text>
                </View>
                <Text
                  style={tw`text-[#a2a2a2] text-[15px] font-400 leading-normal mt-2 self-center`}>
                  {e?.starting_at}
                </Text>
              </View>
            ))
          ) : (
            <Text
              style={tw`text-[#fff] text-[18px] font-400 leading-normal mt-1 self-center `}>
              No fixtures available...
            </Text>
          )}
        </>
      )}
    </View>
  );

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
