import { Alert } from 'react-native';

export const customAlert = (msg, confirmButtonTitle, onPressConfirmButton) => {
    Alert.alert(
        '',
        msg,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: confirmButtonTitle, onPress: onPressConfirmButton },
        ],
        { cancelable: false }
    );
};
