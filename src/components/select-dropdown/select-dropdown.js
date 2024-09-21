import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from '../../styles/tailwind';

const items = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fb1aa97f63',
    flag: require('../../assets/league_icons/league-1.png'),
    name: 'Saudi Pro League',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    flag: require('../../assets/league_icons/league-2.png'),
    name: 'Saudi First Division L...',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d756',
    flag: require('../../assets/league_icons/league-3.png'),
    name: 'Saudi Second Di...',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    flag: require('../../assets/league_icons/league-1.png'),
    name: 'Saudi King’s Cup',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e674d95',
    flag: require('../../assets/league_icons/league-2.png'),
    name: 'Saudi Crown Pri...',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d95',
    flag: require('../../assets/league_icons/league-3.png'),
    name: 'Saudi Super Cup',
  },
];

const MultiSelectDropdown = ({leagueBy, leaguePlaceholder}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  const toggleItemSelection = item => {
    if (selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(
        selectedItems.filter(selected => selected.id !== item.id),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderSelectedItems = () => {
    return selectedItems.map(item => (
      <View key={item.id} style={[tw`w-1/3 p-2`, styles.selectedItemContainer]}>
        <Image source={item.flag} style={tw`h-20 w-20 self-center`} />
        <Text style={[tw`w-20 self-center`, styles.selectedItemText]}>
          {item.name}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => toggleItemSelection(item)}>
          <AntDesign name="closecircle" size={20} color="#ff0000" />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={tw`text-[#fff] text-[24px] font-401 leading-normal mt-3`}>
        {leagueBy}
      </Text>
      <TouchableOpacity
        style={[tw`flex-row justify-between`, styles.dropdownToggle]}
        onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Text style={styles.dropdownToggleText}>{leaguePlaceholder}</Text>
        <AntDesign
          name={dropdownVisible ? 'caretup' : 'caretdown'}
          size={16}
          color={'#fff'}
          style={tw`mt-0.5`}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <View style={[tw`flex-row`, styles.searchInput]}>
            <AntDesign
              name={'search1'}
              size={16}
              color={'#999'}
              style={tw`mt-2 mr-3`}
            />
            <TextInput
              style={tw`text-[#fff]`}
              placeholder="Search Leagues..."
              placeholderTextColor="#fff"
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
          </View>
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.find(selected => selected.id === item.id) &&
                    styles.selectedItem,
                ]}
                onPress={() => toggleItemSelection(item)}>
                <Image source={item.flag} style={styles.flag} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.list}
            nestedScrollEnabled={true}
          />
          {/* <TouchableOpacity
            onPress={() => setDropdownVisible(false)}
            style={[
              tw`mt-7 mx-6 rounded-md`,
              {
                width: '88%',
                height: 55,
              },
            ]}>
            <LinearGradient
              colors={['#6A36CE', '#2575F6']}
              start={{x: 0, y: 0}} // Start from top left
              end={{x: 1, y: 1}} // End at bottom right
              style={[
                tw`rounded-xl justify-center`,
                {flex: 1, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      )}

      <View style={[tw`flex-row flex-wrap mt-5`]}>{renderSelectedItems()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
  },
  dropdownToggle: {
    padding: 10,
    backgroundColor: '#303649',
    borderRadius: 5,
  },
  dropdownToggleText: {
    color: 'white',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#303649',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
    paddingVertical: 1,
    paddingHorizontal: 25,
    marginBottom: 15,
    fontSize: 14,
    height: 40,
  },
  textInput: {
    flex: 1,
    color: '#000',
  },
  list: {
    maxHeight: 200,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#3b3b3b',
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  flag: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },

  selectedItemContainer: {
    marginBottom: 5,
    position: 'relative', // To position the remove button
  },
  selectedItemText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
});

export default MultiSelectDropdown;
