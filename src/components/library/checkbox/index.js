import React, { memo, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import tw from '../../../styles/tailwind';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Text from '../text';

const renderCheckbox = (onPress, checked, checkColor, disabled) => {
    const opacityValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

    const handlePress = () => {
        Animated.timing(opacityValue, {
            toValue: checked ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            onPress();
        });
    };

    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: checked ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [checked]);

    return (
        <TouchableOpacity onPress={handlePress} style={tw``}>
            <View style={tw`relative`}>
                <View
                    style={[
                        tw`w-4 h-4 border border-black p-2 rounded-sm`,
                        disabled && tw`bg-gray-500`,
                    ]}
                ></View>
                <Animated.View
                    style={[
                        { opacity: opacityValue },
                        tw`absolute -top-0 -left--0.2`,
                    ]}
                >
                     <AntDesign
                                name={'check'}
                                size={16}
                                
                                style={tw`self-end`}
                            />
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

const Checkbox = ({
    direction,
    label,
    onPress,
    checked,
    disabled,
    checkColor,
    gap = 16,
    style = [],
}) => {
    return (
        <View
            style={[
                tw`flex flex-row items-center `,
                { gap: gap },
                { ...style },
            ]}
            pointerEvents={disabled ? 'none' : 'auto'}
        >
            {direction === 'left' &&
                renderCheckbox(onPress, checked, checkColor, disabled)}
            <TouchableOpacity onPress={onPress}>
                <Text style={tw`text-base`}>{label}</Text>
            </TouchableOpacity>
            {direction === 'right' &&
                renderCheckbox(onPress, checked, checkColor, disabled)}
        </View>
    );
};

export default memo(Checkbox);
