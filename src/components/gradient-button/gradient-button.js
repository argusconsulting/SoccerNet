import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import tw from '../../styles/tailwind';

const GradientButton = ({navigationScreen, labelShown, width, alignment}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(`${navigationScreen}`)}
        style={[
          tw`mt-1 rounded-xl justify-center `,
          {
            width: width ? width : '100%',
            height: 50,
            alignSelf: alignment ? alignment : 'center',
          },
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}} // Start from top left
          end={{x: 1, y: 1}} // End at bottom right
          style={[
            tw`rounded-xl justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
            {labelShown}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
