import PropTypes from "prop-types";
import React, { memo, useEffect, useRef, useState } from "react";
import { View, Animated, Easing, TouchableWithoutFeedback, StyleSheet } from "react-native";

const radius = 10;
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "transparent",
		overflow: "hidden"
	},

	ripple: {
		width: radius * 2,
		height: radius * 2,
		borderRadius: radius,
		overflow: "hidden",
		position: "absolute"
	}
});

const Ripple = (props) => {
	const [width, setWidth] = useState();
	const [height, setHeight] = useState();
	const [ripples, setRipples] = useState([]);
	let unique = useRef(0);
	let mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	const onLayout = (event) => {
		let { width, height } = event.nativeEvent.layout;
		let { onLayout } = props;

		if ("function" === typeof onLayout) {
			onLayout(event);
		}
		setWidth(width);
		setHeight(height);
	};

	const onPress = (event) => {
		let { onPress, rippleSequential } = props;

		if (!rippleSequential || !ripples.length) {
			if ("function" === typeof onPress) {
				requestAnimationFrame(() => onPress(event));
			}

			startRipple(event);
		}
	};

	const onLongPress = (event) => {
		let { onLongPress } = props;

		if ("function" === typeof onLongPress) {
			requestAnimationFrame(() => onLongPress(event));
		}

		startRipple(event);
	};

	const onPressIn = (event) => {
		let { onPressIn } = props;

		if ("function" === typeof onPressIn) {
			onPressIn(event);
		}
	};

	const onPressOut = (event) => {
		let { onPressOut } = props;

		if ("function" === typeof onPressOut) {
			onPressOut(event);
		}
	};

	const onAnimationEnd = () => {
		const ripp = [...ripples];
		if (mounted.current) {
			setRipples(ripp.slice(1));
		}
	};

	const startRipple = (event) => {
		let { rippleDuration, rippleCentered, rippleSize, onRippleAnimation } = props;

		let w2 = 0.5 * width;
		let h2 = 0.5 * height;

		let { locationX, locationY } = rippleCentered ? { locationX: w2, locationY: h2 } : event.nativeEvent;

		let offsetX = Math.abs(w2 - locationX);
		let offsetY = Math.abs(h2 - locationY);

		let R = rippleSize > 0 ? 0.5 * rippleSize : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

		let ripple = {
			unique: unique.current++,
			progress: new Animated.Value(0),
			locationX,
			locationY,
			R
		};

		let animation = Animated.timing(ripple.progress, {
			toValue: 1,
			easing: Easing.out(Easing.ease),
			duration: rippleDuration,
			useNativeDriver: true,
			isInteraction: true
		});

		onRippleAnimation(animation, onAnimationEnd);
		setRipples(ripples.concat(ripple));
	};

	const RenderRipple = ({ progress, locationX, locationY, R, unique }) => {
		let { rippleColor, rippleOpacity, rippleFades } = props;

		let rippleStyle = {
			top: locationY - radius,
			left: locationX - radius,
			backgroundColor: rippleColor,

			transform: [
				{
					scale: progress.interpolate({
						inputRange: [0, 1],
						outputRange: [0.5 / radius, R / radius]
					})
				}
			],

			opacity: rippleFades
				? progress.interpolate({
						inputRange: [0, 1],
						outputRange: [rippleOpacity, 0]
				  })
				: rippleOpacity
		};

		return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
	};

	let {
		delayLongPress,
		delayPressIn,
		delayPressOut,
		disabled,
		hitSlop,
		pressRetentionOffset,
		children,
		rippleContainerBorderRadius,
		testID,
		nativeID,
		rippleOverflow,
		accessible,
		accessibilityLabel,
		onLayout: __ignored__,
		...rest_props
	} = props;

	let touchableProps = {
		delayLongPress,
		delayPressIn,
		delayPressOut,
		disabled,
		hitSlop,
		pressRetentionOffset,
		onPress,
		onPressIn,
		testID,
		nativeID,
		accessible,
		accessibilityLabel,
		onPressOut,
		onLongPress: rest_props.onLongPress ? onLongPress : undefined,
		onLayout
	};

	let containerStyle = {
		borderRadius: rippleContainerBorderRadius,
		overflow: rippleOverflow ? "visible" : "hidden"
	};

	return (
		<TouchableWithoutFeedback {...touchableProps}>
			<Animated.View {...rest_props}>
				{children}
				{ripples.length > 0 ? (
					<View style={[styles.container, containerStyle]}>
						{ripples.map((item, i) => (
							<RenderRipple {...item} key={i} />
						))}
					</View>
				) : null}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

Ripple.propTypes = {
	...Animated.View.propTypes,
	...TouchableWithoutFeedback.propTypes,

	rippleColor: PropTypes.string,
	rippleOpacity: PropTypes.number,
	rippleDuration: PropTypes.number,
	rippleSize: PropTypes.number,
	rippleContainerBorderRadius: PropTypes.number,
	rippleCentered: PropTypes.bool,
	rippleOverflow: PropTypes.bool,
	rippleSequential: PropTypes.bool,
	rippleFades: PropTypes.bool,
	disabled: PropTypes.bool,

	onRippleAnimation: PropTypes.func
};

Ripple.defaultProps = {
	...TouchableWithoutFeedback.defaultProps,

	rippleColor: "rgb(0, 0, 0)",
	rippleOpacity: 0.3,
	rippleDuration: 400,
	rippleSize: 0,
	rippleContainerBorderRadius: 0,
	rippleCentered: false,
	rippleOverflow: false,
	rippleSequential: false,
	rippleFades: true,
	disabled: false,

	onRippleAnimation: (animation, callback) => animation.start(callback)
};

export default memo(Ripple);
