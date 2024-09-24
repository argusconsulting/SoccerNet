import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from '../../styles/tailwind'
import Header from '../../components/header/header'
import { useNavigation } from '@react-navigation/native';


const data = [
    { id: '1', label: 'Box 1' },
    { id: '2', label: 'Box 2' },
    { id: '3', label: 'Box 3' },
    { id: '4', label: 'Box 4' },
];

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const boxSize = screenWidth / numColumns - 40; // Adjust the spacing

const Trivia = () => {
    const navigation = useNavigation(); // Move useNavigation here

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={[tw`rounded-xl border-[#fff] border-[0.5px]`, styles.box, { width: boxSize, height: boxSize }]} 
                onPress={() => navigation.navigate('TriviaQuestions')}>
                <Text style={styles.boxText}>{item.label}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={tw`bg-[#05102E] flex-1 `}>
            <Header name="Trivia" />
           
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.container}
            />
        </View>
    )
}

export default Trivia

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    box: {
        backgroundColor: '#303649',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})
