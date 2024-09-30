import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import tw from '../../styles/tailwind';
import {RadioButton} from 'react-native-paper';
import GradientButton from '../gradient-button/gradient-button';
import TextInput from '../../components/library/text-input';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const BottomSheetModal = ({isVisible, onClose, selectedValue}) => {
  const [checked, setChecked] = React.useState('first');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isLogin, setIsLogin] = useState(selectedValue === 'Login');
  const phoneInput = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLogin(selectedValue === 'Login');
  }, [selectedValue, isVisible]);

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  console.log(isVisible);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}>
      <View style={styles.content}>
        <View style={styles.header} />
        <View style={tw`flex-row `}>
          <Image
            source={require('../../assets/logo.png')}
            style={[tw`w-12 h-12 self-center mb-3`, {resizeMode: 'contain'}]}
          />
          <Text
            style={tw`text-white text-[28px] font-401 leading-tight self-center mx-5`}>
            Welcome to Kick Score
          </Text>
        </View>

        <View style={tw`flex-row justify-between mt-1`}>
          <View style={tw`flex-row`}>
            <RadioButton
              color="#fff"
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <Text
              style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight self-center ml-2`}>
              Email
            </Text>
          </View>

          <View style={tw`flex-row`}>
            <RadioButton
              value="second"
              color="#fff"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
            <Text
              style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight self-center ml-2`}>
              Phone Number
            </Text>
          </View>
        </View>

        {/* Conditionally render text inputs */}
        <View style={tw`mt-5`}>
          {checked === 'first' ? (
            // Email inputs
            <>
              <TextInput
                type="text"
                style={tw`border border-[#a9a9a9] text-white p-2 h-11 rounded-lg px-3`}
                placeholder="Enter your name"
              />

              <TextInput
                type="text"
                style={tw`border border-[#a9a9a9] text-white p-2 h-11 rounded-lg mt-5 px-3`}
                placeholder="Enter your email"
              />

              <TextInput
                type="password"
                style={tw`border border-[#a9a9a9] text-white p-2 h-11 rounded-lg mt-5 px-3`}
                placeholder="Enter your password"
              />
            </>
          ) : (
            // Phone number input
            <>
              <TextInput
                type="text"
                style={tw`border border-[#a9a9a9] text-white p-2 h-11 rounded-lg  px-3`}
                placeholder="Enter your name"
              />

              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="second"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus={false}
                containerStyle={tw`  bg-[#12122A] w-88 rounded-lg mt-5 border-[#a9a9a9] border-[1px]`}
                textContainerStyle={tw`bg-[#12122a] border-l-[#a9a9a9] border-[1px] h-11  py-0 text-[#a9a9a9] rounded-lg`}
                codeTextStyle={tw`text-[#a9a9a9] border-r-[#a9a9a9] `}
                textInputStyle={tw`text-[#a9a9a9]`}
                textInputProps={{
                  selectionColor: '#a9a9a9', // Set the cursor color to white
                }}
              />

              <TextInput
                type="password"
                style={tw`border border-[#a9a9a9] text-white p-2 h-11 rounded-lg mt-5 px-3`}
                placeholder="Password"
              />
            </>
          )}
        </View>

        <View style={tw`mt-7`}>
          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate('LeagueSelection');
            }}
            style={[
              tw`mt-1 rounded-xl justify-center `,
              {
                width: '100%',
                height: 50,
                alignSelf: 'center',
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
                {isLogin ? 'Log In' : 'Free Sign Up'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row mt-7 self-center`}>
          <View style={tw`border-b-[#fff] border-[1px] w-40 mb-2`} />
          <Text
            style={tw`text-white text-[16px] font-400 leading-tight self-center mx-3 `}>
            or
          </Text>
          <View style={tw`border-b-[#fff] border-[1px] w-40 mb-2`} />
        </View>

        <View style={tw`flex-row mt-7 `}>
          <Text
            style={tw`text-white text-[20px] font-400 leading-tight self-center mx-3 `}>
            {isLogin ? 'Log in with' : 'Sign up with'}
          </Text>
          <Image
            source={require('../../assets/icons/google.png')}
            style={[tw`w-8 h-8 self-center mx-5`, {resizeMode: 'contain'}]}
          />
          <Image
            source={require('../../assets/icons/facebook.png')}
            style={[tw`w-9 h-9 self-center mr-5`, {resizeMode: 'contain'}]}
          />
          <Image
            source={require('../../assets/icons/apple.png')}
            style={[tw`w-9 h-9 self-center mr-5`, {resizeMode: 'contain'}]}
          />
          <Image
            source={require('../../assets/icons/instagram.png')}
            style={[tw`w-10 h-10 self-center `, {resizeMode: 'contain'}]}
          />
        </View>
        <TouchableOpacity
          style={tw`flex-row mt-7 self-center`}
          onPress={toggleLoginSignup}>
          <Text
            style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight self-center mx-1 `}>
            {isLogin ? "Don't have an account?" : 'Have an account?'}
          </Text>
          <Text
            style={tw`text-[#88afff] text-[18px] font-401 leading-tight self-center  `}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: '#12122A',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 600,
  },
  header: {
    width: 100,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default BottomSheetModal;
