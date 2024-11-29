import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  setSocialLoginToken,
  setUserAuthToken,
  setUserID,
} from '../redux/authSlice';
import tw from '../styles/tailwind';
import {store} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {setSocialProfile} from '../redux/profileSlice';
import {api_name_google_login} from '../constants/api-constants';
import {postApi} from '../scripts/api-services';

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '221160589936-84ekdd7ecdm8lflgfi4akiahm19tp7sq.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      var idToken = usrInfo?.data?.idToken;
      console.log('idToekn', idToken);
      store.dispatch(setSocialLoginToken());
      const response = await _googleSocialLogin(idToken);
      navigation.navigate('LeagueSelection');
      store.dispatch(setSocialProfile(response?.data));
      store.dispatch(setUserAuthToken(response?.data?.token));
      store.dispatch(setUserID(response?.data?.user?.id));
      // navigation.navigate('Home');
      return await GoogleSignin.signOut();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function _googleSocialLogin(idToken) {
    try {
      const response = await postApi(api_name_google_login, {
        token: idToken,
      });
      console.log('google res', response);

      return response; // Return the response here
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error so it can be handled in the caller function
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => signIn()}>
        <Image
          source={require('../assets/icons/google.png')}
          style={[tw`w-8 h-8 self-center  mr-7 mt-1`, {resizeMode: 'contain'}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({});
