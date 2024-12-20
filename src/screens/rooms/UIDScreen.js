import React, { useState } from 'react';
import {
    SafeAreaView,
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';

const UserIdScreen = ({ navigation }) => {
    const [userId, setUserId] = useState('');

    const handleJoin = () => {
        if (userId.trim() === '') {
            alert('Please enter a valid user ID');
            return;
        }
        navigation.navigate('InitialScreen', { uid: parseInt(userId, 10) });
    };

    return (
        <SafeAreaView style={[tw`bg-red-200` ,styles.main]}>
            <Header name=""/>
            <Text style={styles.head}>Enter User ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your User ID"
                keyboardType="numeric"
                value={userId}
                onChangeText={setUserId}
            />
            <TouchableOpacity onPress={handleJoin} style={styles.button}>
                <Text style={styles.buttonText}>Join Voice Chat</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    head: { fontSize: 20, marginBottom: 20 },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0055cc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default UserIdScreen;
