import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';



// import Spinner from '~/components/common/spinner';
import Text from './text';

import ripple from '../../scripts/ripple';
import tw from '../../styles/tailwind';

const Button = ({
    text,
    link,

    variant = 'primary',
    style,
    loader,

    border,
    shape = 'rounded',
    regular,
    disabled,
    children,
    font_style,
    size = 'large',
    noUpperCase = true,
    ripple,
    rippleDark,
    radial,
    onPress,

    w600,
    w700,
}) => {
    const is_disabled = loader ? true : disabled ? true : false;
    let buttonWrapStyle =
        'flex flex-row items-center justify-center relative overflow-hidden';
    let buttonTextStyle = '';
    const font_weight = !!w600
        ? { w600: true }
        : !!w700
        ? { w700: true }
        : { w500: true };
    if (!noUpperCase) {
        buttonTextStyle += ' uppercase';
    }

    if (size === 'micro') {
        buttonWrapStyle += ` h-5  ${!regular ? 'px-6' : ''}`;
        buttonTextStyle += ` text-xs`;
    } else if (size === 'small') {
        buttonWrapStyle += ` h-7 ${!regular ? 'px-6' : ''}`;
        buttonTextStyle += ` text-base`;
    } else if (size === 'large') {
        buttonWrapStyle += ` h-11 ${!regular ? 'px-7' : ''}`;
        buttonTextStyle += ` text-md`;
    } else {
        buttonWrapStyle += ` h-8 ${!regular ? 'px-6' : ''}`;
        buttonTextStyle += ` text-base`;
    }

    if (text) {
        buttonTextStyle += ' text-gray-dark';
    } else {
        if (variant === 'primary') {
            if (link) {
                buttonWrapStyle += ' bg-transparent';
                buttonTextStyle += ' text-primary';
            } else if (border) {
                buttonWrapStyle +=
                    ' bg-transparent text-primary border-primary border border-primary';
                buttonTextStyle += ' text-primary';
            } else {
                buttonWrapStyle += ' bg-primary';
                buttonTextStyle += ' text-white';
            }
        } else if (variant === 'secondary') {
            if (link) {
                buttonWrapStyle += ' bg-transparent text-secondary';
                buttonTextStyle += ' text-secondary';
            } else if (border) {
                buttonWrapStyle +=
                    ' bg-transparent text-secondary border-secondary border border-secondary';
                buttonTextStyle += ' text-secondary';
            } else {
                buttonWrapStyle += ' bg-secondary text-white';
                buttonTextStyle += ' text-white';
            }
        } else if (variant === 'warning') {
            if (link) {
                buttonWrapStyle += ' bg-transparent';
                buttonTextStyle += ' text-warning';
            } else if (border) {
                buttonWrapStyle +=
                    ' bg-transparent text-warning border border-warning';
                buttonTextStyle += ' text-warning';
            } else {
                buttonWrapStyle += ' bg-warning';
                buttonTextStyle += ' text-white';
            }
        } else if (variant === 'danger') {
            if (link) {
                buttonWrapStyle += ' bg-transparent';
                buttonTextStyle += ' text-danger';
            } else if (border) {
                buttonWrapStyle +=
                    ' bg-transparent border-danger border border-danger';
                buttonTextStyle += ' text-danger';
            } else {
                buttonWrapStyle += ' bg-danger text-white';
                buttonTextStyle += ' text-white';
            }
        } else if (variant === 'success') {
            if (link) {
                buttonWrapStyle += ' bg-transparent';
                buttonTextStyle += ' text-success';
            } else if (border) {
                buttonWrapStyle +=
                    ' bg-transparent border-success border border-success';
                buttonTextStyle += ' text-success';
            } else {
                buttonWrapStyle += ' bg-success text-white';
                buttonTextStyle += ' text-white';
            }
        } else {
            if (link) {
                buttonWrapStyle += ' bg-transparent';
                buttonTextStyle += ' text-primary';
            } else if (border) {
                buttonWrapStyle += ' bg-transparent border border-gray-dark';
                buttonTextStyle += ' text-gray-medium ';
            } else {
                buttonTextStyle += ' text-gray-medium';
            }
        }
    }

    if (!!is_disabled) {
        buttonWrapStyle += variant === 'danger' ? ' opacity-30' : ' opacity-50';
    }

    if (shape === 'rounded') {
        buttonWrapStyle += ' rounded-lg';
    }

    const loaderStyle =
        size === 'micro'
            ? { right: 5 }
            : size === 'small'
            ? { right: 5 }
            : size === 'large'
            ? { right: 15 }
            : { right: 5 };

    const loaderSize =
        size === 'micro'
            ? 15
            : size === 'small'
            ? 18
            : size === 'large'
            ? 25
            : 19;
    const loaderColor =
        !link &&
        (variant === 'primary' ||
            variant === 'warning' ||
            variant === 'danger' ||
            variant === 'success')
            ? '#fff'
            : '#818181';

    const rippleColor = !!rippleDark
        ? 'rgba(0,0,0,0.3)'
        : 'rgba(255,255,255,0.7)';
    const rippleBorderless = !!radial ? true : false;

    // const debouncedPress = useCallback(
    //   debounce(onPress, 1000, {leading: true, trailing: false}),
    //   [onPress],
    // );

    function actionToCall() {
        if (!!onPress) onPress();
        //   if (disabled) return;
        //   if (noDebounce) onPress();
        //   else debouncedPress();
    }

    let extra_class = tw`${buttonTextStyle}`;
    extra_class = { ...extra_class, ...font_style };

    const childrenType = typeof children;

    return (
        <Ripple
            onPress={actionToCall}
            disabled={disabled}
            rippleColor={rippleColor}
            rippleOpacity={1}
            rippleOverflow={rippleBorderless}
            rippleCentered={rippleBorderless}
        >
            <View
                style={[
                    tw`${buttonWrapStyle}`,
                    Array.isArray(style) ? [...style] : style,
                ]}
                pointerEvents="box-only"
            >
                {childrenType === 'string' ? (
                    <Text style={extra_class}>{children}</Text>
                ) : (
                    children
                )}
                {!loader ? null : (
                    <View style={{ position: 'absolute', ...loaderStyle }}>
                        <ActivityIndicator
                            size={loaderSize}
                            color={loaderColor}
                        />
                    </View>
                )}
            </View>
        </Ripple>
    );
};

Button.PropTypes = {
    noUpperCase: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'micro', 'large']),
    variant: PropTypes.oneOf([
        'warning',
        'danger',
        'success',
        'primary',
        'secondary',
    ]),
    shape: PropTypes.oneOf(['pill', 'rounded']),
    font_style: PropTypes.object,
};

export default memo(Button);
