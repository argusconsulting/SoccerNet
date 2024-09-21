import React, { memo } from 'react';
import { View } from 'react-native';
import tw from '../../styles/tailwind';
import Text from './text';
import Button from './button';



const CustomToast = ({
    message,
    success,
    error,
    action_text,
    action_callback = () => {},
}) => {
    return (
        <View
            style={[
                tw`flex flex-row items-center mx-2.5 relative  px-2.5 py-1 rounded-md ${
                    !!success
                        ? 'bg-success'
                        : !!error
                        ? 'bg-danger'
                        : 'bg-gray-dark'
                }
				`,
                { minHeight: 48 },
            ]}
        >
            <View style={tw`flex-1`}>
                <Text
                    w500
                    style={tw`text-white text-base ${
                        !action_text ? 'text-center' : null
                    }`}
                >
                    {message}
                </Text>
            </View>
            {!!action_text ? (
                <View>
                    <Button onPress={action_callback} link warning>
                        {action_text}
                    </Button>
                </View>
            ) : null}
        </View>
    );
};

export default memo(CustomToast);
