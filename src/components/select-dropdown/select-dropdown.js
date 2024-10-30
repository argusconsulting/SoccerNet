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

const MultiSelectDropdown = ({
  leagueBy,
  leaguePlaceholder,
  data,
  onSelectionChange,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  const toggleItemSelection = item => {
    console.log('id', item);
    let updatedSelection;
    if (selectedItems.find(selected => selected.league_id === item.league_id)) {
      updatedSelection = selectedItems.filter(
        selected => selected.league_id !== item.league_id,
      );
    } else {
      updatedSelection = [...selectedItems, item];
    }
    setSelectedItems(updatedSelection);
    onSelectionChange(updatedSelection); // Notify parent of the change
  };

  const filteredData = data?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchText.toLowerCase()),
  );

  const renderSelectedItems = () =>
    selectedItems.map(item => (
      <View
        key={item.league_id}
        style={[tw`w-1/3 p-2`, styles.selectedItemContainer]}>
        <Image
          source={{uri: item.image_path}}
          style={tw`h-20 w-20 self-center`}
        />
        <Text style={[tw`w-22 self-center`, styles.selectedItemText]}>
          {item.name}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => toggleItemSelection(item)}>
          <AntDesign name="closecircle" size={20} color="#ff0000" />
        </TouchableOpacity>
      </View>
    ));

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
              style={tw`text-[#fff] flex-1`}
              placeholder="Search Leagues..."
              placeholderTextColor="#fff"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.find(
                    selected => selected.league_id === item.league_id,
                  ) && styles.selectedItem,
                ]}
                onPress={() => toggleItemSelection(item)}>
                <Image source={{uri: item.image_path}} style={styles.flag} />
                <Text style={styles.itemText}>{item?.name}</Text>
              </TouchableOpacity>
            )}
            nestedScrollEnabled
          />
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
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
});

export default MultiSelectDropdown;
