import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import countries from "../helpers/countries";
import tw from "../styles/tailwind";

const CountryPicker = ({ onSelect, value }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (country) => {
    setIsOpen(false);
    onSelect(country.label); // Pass only the country label to `onSelect`
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[tw`w-69 ml-1`, styles.dropdown]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectedText}>
          {value || "Select a country"} {/* Show value passed from props */}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search country"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.countryText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderBottomColor: "#a9a9a9",
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "transparent",
  },
  selectedText: {
    fontSize: 16,
    color: "#a9a9a9",
  },
  dropdownContent: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    maxHeight: 200,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  countryItem: {
    padding: 10,
  },
  countryText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CountryPicker;
