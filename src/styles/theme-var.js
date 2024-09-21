import { Dimensions, Platform } from 'react-native';

const themeVar = {
    primary: { default: '#007ECE', dark: '#0b7670', light: '#e1fdf8' },
    secondary: { default: '#d9dd28' },
    warning: { default: '#fb8903', light: '#fff0ca' },
    danger: { default: '#ff0000', light: '#ffebeb' },
    success: { default: '#5cb85c', light: '#ecffef' },
    gray: {
        dark: '#464646',
        default: '#3c4858',
        medium: '#818181',
        light: '#b7b7b7',
        lightest: '#F4F4F4',
    },

    platform: Platform.OS,
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
    pointerEvents: Platform.OS === 'android' ? { pointerEvents: 'none' } : null,
};

export default themeVar;
