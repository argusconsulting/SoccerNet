import React from 'react';
import Toast from 'react-native-toast-message';
import CustomToast from '../components/library/custom-toast';



const Alertify = {
    success: (alert_text) => {
        Toast.show({
            type: 'success',
            text1: alert_text,
            swipeable: true,
            position: 'top',
            topOffset: 60,
        });
    },
    error: (alert_text) => {
        Toast.show({
            type: 'error',
            text1: alert_text,
            swipeable: true,
            position: 'top',
            topOffset: 60,
        });
    },
    default: (alert_text, action) => {
        Toast.show({
            type: 'default',
            text1: alert_text,
            swipeable: true,
            position: 'bottom',
            topOffset: 60,
            props: action,
        });
    },
};

export const config = {
    success: (internalState) => (
        <CustomToast success message={internalState.text1} />
    ),
    error: (internalState) => (
        <CustomToast error message={internalState.text1} />
    ),
    default: (internalState) => (
        <CustomToast message={internalState.text1} {...internalState.props} />
    ),
};

export default Alertify;
