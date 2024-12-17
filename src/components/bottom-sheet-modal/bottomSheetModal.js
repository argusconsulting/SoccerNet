import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import tw from '../../styles/tailwind';
import {RadioButton} from 'react-native-paper';
import TextInput from '../../components/library/text-input';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../../scripts/validations';
import {postApi} from '../../scripts/api-services';
import {api_name_login, api_name_register} from '../../constants/api-constants';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../loader/Loader';
import {
  setUserAuthToken,
  setUserDetails,
  setUserID,
} from '../../redux/authSlice';
import Alertify from '../../scripts/toast';
import {useTranslation} from 'react-i18next';
import GoogleLogin from '../google-login';
import FacebookLogin from '../facebook-login';
import MicrosoftLogin from '../microsoft-login';
import {GetFCMToken} from '../notification-component';
import {getSelectedLeagues} from '../../redux/leagueSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomSheetModal = ({isVisible, onClose, selectedValue}) => {
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {i18n, t} = useTranslation();
  const [checked, setChecked] = useState('email');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isLogin, setIsLogin] = useState(selectedValue === 'Login');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const getSelectedLeagues = async currentUserId => {
    try {
      const savedData = await AsyncStorage.getItem('selectedLeagues');
      if (savedData) {
        const {userId, leagues} = JSON.parse(savedData);

        if (userId === currentUserId && leagues?.length > 0) {
          // User matches and has selected leagues
          navigation.navigate('Home');
        } else {
          // Different user or no leagues selected
          navigation.navigate('LeagueSelection');
        }
      } else {
        // No data found
        navigation.navigate('LeagueSelection');
      }
    } catch (error) {
      console.error('Error checking selected leagues:', error);
      navigation.navigate('LeagueSelection');
    }
  };

  useEffect(() => {
    setIsLogin(selectedValue === 'Login');
  }, [selectedValue, isVisible]);

  // Memoized handlers for input changes
  const handleEmailChange = useCallback(text => {
    setEmailValue(text);
  }, []);

  const handlePasswordChange = useCallback(text => {
    setPassword(text);
  }, []);

  const handlePhoneChange = useCallback(text => {
    if (text.length <= 10) {
      setValue(text);
    }
  }, []);

  const handleNameChange = useCallback(text => {
    setName(text);
  }, []);

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  //api call

  async function handleLogin() {
    try {
      if (checked === 'email') {
        if (emailValue == '') {
          ToastAndroid.show('Please enter your Email', ToastAndroid.LONG);
          return; // Stop further execution
        } else if (!validateEmail(emailValue)) {
          ToastAndroid.show(
            'Please enter a valid email address.',
            ToastAndroid.LONG,
          );
          return; // Stop further execution
        }
      }

      // Validation for phone number when `checked` is 'contact'
      if (checked === 'contact_number') {
        if (value == '') {
          ToastAndroid.show(
            'Please enter your Phone Number',
            ToastAndroid.LONG,
          );
          return; // Stop further execution
        } else if (!validatePhoneNumber(value)) {
          ToastAndroid.show(
            'Please enter a valid phone number.',
            ToastAndroid.LONG,
          );
          return; // Stop further execution
        }
      }

      // Validation for password
      if (password == '') {
        ToastAndroid.show('Please enter your password', ToastAndroid.LONG);
        return;
      }
      const device_token = await GetFCMToken();
      // console.log('device token value ', device_token);
      setSubmitLoader(true);
      postApi(api_name_login, {
        login_type: checked,
        login: checked === 'email' ? emailValue : value,
        password: password,
        fcm_token: device_token,
      })
        .then(async response => {
          Alertify.success(response?.data.message);
          setEmailValue('');
          setPassword('');
          setValue(' ');
          if (response?.data?.token) {
            dispatch(setUserAuthToken(response?.data?.token));
            dispatch(setUserID(response?.data?.user?.id));
            dispatch(setUserDetails(response?.data?.user));
            onClose();

            // navigation.navigate('LeagueSelection');
            getSelectedLeagues(response?.data?.user?.id);

            setSubmitLoader(false);
          } else {
            Alertify.error('Incorrect Credentials !');
          }
        })
        .catch(error => {
          Alertify.error('Incorrect Credentials !');
          setSubmitLoader(false);
          console.log('Login Error', error?.message);
        });
    } catch (error) {
      console.log('Login Error ', error);
    }
  }

  async function handleRegister() {
    try {
      if (!name.trim()) {
        ToastAndroid.show('Please enter your Name', ToastAndroid.LONG);
      }
      if (checked === 'email') {
        if (!emailValue.trim()) {
          ToastAndroid.show('Please enter your Email', ToastAndroid.LONG);
          return; // Stop further execution
        } else if (!validateEmail(emailValue)) {
          ToastAndroid.show(
            'Please enter a valid email address.',
            ToastAndroid.LONG,
          );
          return; // Stop further execution
        }
      }

      // Validation for phone number when `checked` is 'contact'
      if (checked === 'contact_number') {
        if (!value.trim()) {
          ToastAndroid.show(
            'Please enter your Phone Number',
            ToastAndroid.LONG,
          );
          return; // Stop further execution
        } else if (!validatePhoneNumber(value)) {
          ToastAndroid.show(
            'Please enter a valid phone number.',
            ToastAndroid.LONG,
          );
          return; // Stop further execution
        }
      }

      // Validation for password
      if (!password.trim()) {
        ToastAndroid.show('Please enter your password', ToastAndroid.LONG);
        return; // Stop further execution
      } else if (!validatePassword(password)) {
        ToastAndroid.show(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
          ToastAndroid.LONG,
        );
        return; // Stop further execution
      } else {
        setSubmitLoader(true);
        postApi(api_name_register, {
          name: name,
          ...(checked === 'email'
            ? {email: emailValue}
            : {contact_number: value}),
          password: password,
          password_confirmation: password,
        })
          .then(async response => {
            Alertify.success(response?.data.message);
            setEmailValue('');
            setPassword('');
            setValue(' ');
            setName(' ');
            onClose();
            setSubmitLoader(false);
          })
          .catch(error => {
            Alertify.error('error', error);
            setSubmitLoader(false);
            console.log('Login Error', error.errors.contact_number);
          });
      }
    } catch (error) {
      console.log('Login Error ', error);
    }
  }

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
            {t('welcomeToKickScore')}
          </Text>
        </View>

        <View style={tw`flex-row justify-between mt-1`}>
          <View style={tw`flex-row`}>
            <RadioButton
              color="#fff"
              value="email"
              status={checked === 'email' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('email')}
            />
            <Text
              style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight self-center ml-2`}>
              {t('email')}
            </Text>
          </View>

          <View style={tw`flex-row`}>
            <RadioButton
              value="contact_number"
              color="#fff"
              status={checked === 'contact_number' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('contact_number')}
            />
            <Text
              style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight self-center ml-2`}>
              {t('phoneNumber')}
            </Text>
          </View>
        </View>

        {/* Conditionally render text inputs */}
        <View style={tw`mt-5`}>
          {checked === 'email' ? (
            // Email inputs
            <>
              {!isLogin && (
                <TextInput
                  type="text"
                  style={tw`border border-[#a9a9a9] text-[#a9a9a9] p-2 h-11 rounded-lg mb-5 px-3`}
                  placeholder={t('namePlaceholder')}
                  value={name}
                  onChangeText={handleNameChange}
                />
              )}

              <TextInput
                type="text"
                style={tw`border border-[#a9a9a9] text-[#a9a9a9] p-2 h-11 rounded-lg mb-5 px-3`}
                placeholder={t('emailPlaceholder')}
                value={emailValue}
                onChangeText={handleEmailChange}
              />

              <TextInput
                type="password"
                style={tw`border border-[#a9a9a9] text-[#a9a9a9] p-2 h-11 rounded-lg  px-3`}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChangeText={handlePasswordChange}
              />

              {isLogin && (
                  <TouchableOpacity onPress={()=> {
                    onClose();
                    navigation.navigate('ForgotPassword')}}>
                <Text
                  style={tw`text-[#a9a9a9] text-[16px] font-401 leading-tight mt-3 mx-1`}>
                  Forgot password ?
                </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            // Phone number input
            <>
              {!isLogin && (
                <TextInput
                  type="text"
                  style={tw`border border-[#a9a9a9] text-[#a9a9a9] p-2 h-11 rounded-lg mb-5 px-3`}
                  placeholder={t('namePlaceholder')}
                  value={name}
                  onChangeText={handleNameChange}
                />
              )}

              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                placeholder={t('phonePlaceholder')}
                defaultCode="IN"
                layout="second"
                onChangeText={handlePhoneChange}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus={false}
                containerStyle={tw`  bg-[#12122A] w-88 rounded-lg mb-5 border-[#a9a9a9] border-[1px]`}
                textContainerStyle={tw`bg-[#12122a] border-l-[#a9a9a9] border-[1px] h-11  py-0 text-[#a9a9a9] rounded-lg`}
                codeTextStyle={tw`text-[#a9a9a9] border-r-[#a9a9a9] `}
                textInputStyle={tw`text-[#a9a9a9]`}
                textInputProps={{
                  selectionColor: '#a9a9a9',
                  maxLength: 10,
                  keyboardType: 'number-pad',
                }}
              />

              <TextInput
                type="password"
                style={tw`border border-[#a9a9a9] text-[#a9a9a9] p-2 h-11 rounded-lg  px-3`}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChangeText={handlePasswordChange}
              />

              {isLogin && (
                <TouchableOpacity onPress={()=> {
                  onClose();
                  navigation.navigate('ForgotPassword')}}>
                <Text
                  style={tw`text-[#a9a9a9] text-[16px] font-401 leading-tight mt-3 mx-1`}>
                  Forgot password ?
                </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <View style={tw`mt-5`}>
          <TouchableOpacity
            onPress={() => {
              isLogin ? handleLogin() : handleRegister();
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
              {submitLoader ? (
                <Loader />
              ) : (
                <Text
                  style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
                  {isLogin ? t('Login') : t('freeSignUp')}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row mt-7 self-center`}>
          <View style={tw`border-b-[#fff] border-[1px] w-40 mb-2`} />
          <Text
            style={tw`text-white text-[16px] font-400 leading-tight self-center mx-3 `}>
            {t('or')}
          </Text>
          <View style={tw`border-b-[#fff] border-[1px] w-40 mb-2`} />
        </View>

        <Text
          style={tw`text-white text-[20px] font-400 leading-tight self-center mx-3 mt-4 `}>
          {isLogin ? t('loginWith') : t('signupWith')}
        </Text>
        <View style={tw`flex-row mt-3 self-center `}>
          <GoogleLogin />

          <Image
            source={require('../../assets/icons/apple.png')}
            style={[tw`w-9 h-9 self-center mr-7`, {resizeMode: 'contain'}]}
          />

          <MicrosoftLogin />

          <FacebookLogin />
        </View>
        <TouchableOpacity
          style={tw`flex-row mt-5 self-center`}
          onPress={toggleLoginSignup}>
          <Text
            style={tw`text-[#a9a9a9] text-[18px] font-400 leading-tight self-center mx-1 `}>
            {isLogin ? t('dontHaveAccount') : t('haveAccount')}
          </Text>
          <Text
            style={tw`text-[#88afff] text-[18px] font-401 leading-tight self-center  `}>
            {isLogin ? t('signup') : t('Login')}
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
