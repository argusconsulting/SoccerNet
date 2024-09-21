import PropTypes from 'prop-types';
import React from 'react';
import { Text as RNText, View } from 'react-native';

import {
    PRIMARY_FONT_BLACK,
    PRIMARY_FONT_BOLD,
    PRIMARY_FONT_REGULAR,
    SECONDARY_FONT,
    SECONDARY_FONT_MEDIUM,
} from '../../styles/fonts';
import tw from '../../styles/tailwind';

const primary_weight = {
    w300: {
        fontFamily: PRIMARY_FONT_REGULAR,
    },
    w500: {
        fontFamily: PRIMARY_FONT_BOLD,
    },
    w700: {
        fontFamily: PRIMARY_FONT_BLACK,
    },
};
const secondary_weight = {
    w300: {
        fontFamily: SECONDARY_FONT_MEDIUM,
    },
    w500: {
        fontFamily: SECONDARY_FONT_MEDIUM,
    },
    w700: {
        fontFamily: SECONDARY_FONT,
    },
};

const getStyle = {
    h1: {
        fontFamily: PRIMARY_FONT_BLACK,
        fontSize: 23,
    },
    h2: {
        fontFamily: PRIMARY_FONT_BOLD,
        fontSize: 20,
    },
    h3: {
        fontFamily: PRIMARY_FONT_REGULAR,
        fontSize: 18,
    },
    p: {
        fontFamily: PRIMARY_FONT_REGULAR,
        fontSize: 16,
    },
    p2: {
        fontFamily: SECONDARY_FONT,
        fontSize: 16,
    },
};
const getTextStyle = (type, weight) => {
    if (type === 'primary' && !weight) {
        return {
            fontFamily: PRIMARY_FONT_REGULAR,
        };
    } else if (type === 'primary' && weight) {
        return primary_weight[weight];
    } else if (type === 'secondary' && !weight) {
        return {
            fontFamily: SECONDARY_FONT_MEDIUM,
        };
    } else if (type === 'secondary' && weight) {
        return secondary_weight[weight];
    }
};

const Text = ({
    style,
    children,
    as = 'p',
    font_type = 'primary',
    font_weight,
    font_size,
    color = 'black',
    ...restProps
}) => {
    let extra_class;
    extra_class = { ...getStyle[as] };
    if (font_size) extra_class = { ...extra_class, fontSize: font_size };

    const classes = getTextStyle(font_type, font_weight);

    let color_class;
    if (color === 'primary') {
        color_class += ` text-primary`;
    } else if (color === 'secondary') {
        color_class += ` text-secondary`;
    } else if (color === 'white') {
        color_class += ` text-white`;
    } else if (color === 'black') {
        color_class += ` text-black`;
    } else if (color === 'danger') {
        color_class += ` text-danger`;
    } else if (color === 'success') {
        color_class += ` text-success`;
    } else if (color === 'warning') {
        color_class += ` text-warning`;
    } else if (color === 'gray') {
        color_class += ` text-gray`;
    }

    const textStyle = Array.isArray(style) ? { ...style } : { ...style };

    return (
        <View>
            <RNText
                style={[extra_class, classes, tw`${color_class}`, textStyle]}
                {...restProps}
            >
                {children}
            </RNText>
        </View>
    );
};

Text.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    as: PropTypes.oneOf(['h1', 'h2', 'p']),
    font_type: PropTypes.oneOf(['primary', 'secondary']),
    font_weight: PropTypes.oneOf(['w300', 'w500', 'w700']),
    font_size: PropTypes.number,
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'danger',
        'success',
        'black',
        'warning',
        'white',
        'gray',
    ]),
};

export default Text;
