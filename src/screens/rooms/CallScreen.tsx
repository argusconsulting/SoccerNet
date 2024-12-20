import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { IRtcEngine, RtcConnection } from 'react-native-agora';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type CallScreenRouteParams = {
    CallScreen: {
        agoraEngine: IRtcEngine;
        uid: number;
    };
};

type CallScreenProps = {
    route: RouteProp<CallScreenRouteParams, 'CallScreen'>;
};

const CallScreen: React.FC<CallScreenProps> = ({ route }) => {
     const navigation = useNavigation<NavigationProp<any>>();
    const { agoraEngine, uid } = route.params;
    const [remoteUids, setRemoteUids] = useState<number[]>([]);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (!agoraEngine) {
            console.error('Agora engine is not available');
            return;
        }

        const eventHandler = {
            onUserJoined: (_connection: RtcConnection, remoteUid: number) => {
                console.log(`User joined: ${remoteUid}`);
                setRemoteUids((prev) => [...prev, remoteUid]);
            },
            onUserOffline: (_connection: RtcConnection, remoteUid: number) => {
                console.log(`User left: ${remoteUid}`);
                setRemoteUids((prev) => prev.filter((id) => id !== remoteUid));
            },
        };

        agoraEngine.registerEventHandler(eventHandler);

        return () => {
            agoraEngine.unregisterEventHandler(eventHandler);
        };
    }, [agoraEngine]);

    const handleMute = () => {
        agoraEngine.muteLocalAudioStream(!isMuted);
        setIsMuted(!isMuted);
    };

    const handleLeaveChannel = async () => {
        try {
            await agoraEngine.leaveChannel();
            navigation.navigate('MeetingChat')
            Alert.alert('You have left the call');
            // Optionally, navigate back to the previous screen or home
        } catch (err) {  // Remove the extra (Error)
            console.error('Failed to leave the channel:');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Call Screen</Text>
            <FlatList
                data={remoteUids}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <View style={styles.avatar} />
                        <Text style={{ fontSize: 16 }}>User {item}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No users in the call yet.</Text>}
            />
            <View style={styles.controls}>
                {/* Mute/Unmute Button */}
                <TouchableOpacity style={styles.button} onPress={handleMute}>
                    <Text style={styles.buttonText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
                </TouchableOpacity>

                {/* Leave Channel Button */}
                <TouchableOpacity style={[styles.button, styles.leaveButton]} onPress={handleLeaveChannel}>
                    <Text style={styles.buttonText}>End Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007aff',
        marginRight: 10,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        padding: 15,
        backgroundColor: '#007aff',
        borderRadius: 10,
        alignItems: 'center',
        width: '40%',
    },
    leaveButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CallScreen;
