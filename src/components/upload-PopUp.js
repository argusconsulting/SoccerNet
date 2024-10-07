import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import tw from '../styles/tailwind';



function UploadPopup(props) {
    const { handleCamera, handleGallery, visible, setVisible } = props;

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => setVisible(!visible)}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        elevation: 10,
                        marginHorizontal: 10,
                        width: '100%',
                        shadowOffset: { width: 2, height: 1 },
                        shadowColor: '#bbbbbb',
                        shadowOpacity: 1,
                    }}
                >
                   
                    <TouchableOpacity
                        onPress={() => handleCamera()}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 20,
                            marginHorizontal: 10,
                            borderBottomColor: '#DEDEDE',
                            borderBottomWidth: 1,
                        }}
                    >
                         <Text style={tw`text-[#383838]  text-[16px] font-400 `}>
                         Click Now
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleGallery()}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 20,
                            marginHorizontal: 10,
                            borderBottomColor: '#DEDEDE',
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text style={tw`text-[#383838]  text-[16px] font-400 `}>
                            Choose From Your Gallery
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setVisible(!visible)}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 20,
                            marginHorizontal: 10,
                            borderBottomColor: '#DEDEDE',
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text style={tw`text-[#383838]  text-[16px] font-400 `}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
export default UploadPopup;
