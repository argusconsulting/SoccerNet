import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../components/gradient-button/gradient-button';

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigation = useNavigation();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Arabic',
      image: require('../../assets/flags/arab.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'English',
      image: require('../../assets/flags/uk.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Spanish',
      image: require('../../assets/flags/spain.png'),
    },
    {
      id: '58694a0f-3da1-4bd96-145571e29d72',
      title: 'French',
      image: require('../../assets/flags/france.png'),
    },
    {
      id: '58694a0f-3da1-471f-96-145571e29d72',
      title: 'German',
      image: require('../../assets/flags/germany.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2',
      title: 'Italian',
      image: require('../../assets/flags/italy.png'),
    },
  ];

  const Item = ({item}) => {
    const isSelected = selectedLanguage === item.id;
    return (
      <TouchableOpacity
        style={[
          tw`items-center p-2 rounded-lg`,
          isSelected ? tw`border-2 border-white rounded-lg ` : null,
        ]}
        onPress={() => {
          setSelectedLanguage(item.id);
        }}>
        <Image
          source={item?.image}
          style={[tw`w-30 h-25`, {resizeMode: 'contain'}]}
        />
        <Text style={tw`text-[#fff] text-[20px] font-400 leading-tight`}>
          {item?.title}
        </Text>
        {isSelected && (
          <View
            style={tw`bg-[#435AE5] rounded-full w-6 h-6 absolute right--3 top--3 justify-center`}>
            <AntDesign
              name={'check'}
              size={14}
              color={'#fff'}
              style={tw`self-center`}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`bg-[#12122A] flex-1 p-5`}>
      <Text style={tw`text-white text-[36px] font-401 leading-tight  mt-1`}>
        Select a {'\n'}Language
      </Text>

      <Text
        style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight mt-5 mb-3`}>
        Choose a language. You can make changes later through settings.
      </Text>

      <FlatList
        numColumns={2}
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        columnWrapperStyle={tw`justify-around mt-3`} // Adjusted padding for spacing
      />

      <GradientButton navigationScreen="SplashScreen" labelShown="Continue" />
    </View>
  );
};

export default LanguageSelection;
