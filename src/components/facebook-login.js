import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';
import tw from '../styles/tailwind';
import {setSocialLoginToken, setUserAuthToken} from '../redux/authSlice';
import {store} from '../redux/store';
import {api_name_fb_login} from '../constants/api-constants';
import {postApi} from '../scripts/api-services';
import {setSocialProfile} from '../redux/profileSlice';
import {useNavigation} from '@react-navigation/native';

const FacebookLogin = () => {
  const navigation = useNavigation();
  // working code
  //   const handleLoginFinished = async (error, result) => {
  //     console.log('Error:', error, 'Result:', result);

  //     if (error) {
  //       console.log('Login error:', error);
  //       Alert.alert('Login Error', error.message);
  //     } else if (result.isCancelled) {
  //       console.log('Login was cancelled.');
  //     } else {
  //       try {
  //         const data = await AccessToken.getCurrentAccessToken();
  //         console.log('Access Token:', data?.accessToken.toString());

  //         const profile = await Profile.getCurrentProfile();
  //         if (profile) {
  //           console.log(`Logged in as ${profile.name} with ID ${profile.userID}`);
  //         }
  //       } catch (err) {
  //         console.log('Error fetching profile:', err);
  //         Alert.alert('Error', 'Could not retrieve profile information.');
  //       }
  //     }
  //   };

  const fbLogin = async () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          getData();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getData = async () => {
    try {
      const data = await AccessToken.getCurrentAccessToken();
      // console.log('this is data', data);
      var idToken = data?.accessToken;
      store.dispatch(setSocialLoginToken());
      const response = await _fbSocialLogin(idToken);
      // console.log('checking response now here ', response);
      store.dispatch(setSocialProfile(response?.data?.user));
      store.dispatch(setUserAuthToken(response?.data?.token));
      navigation.navigate('Home');
      if (!data) throw new Error('No access token found');
    } catch (error) {
      console.log('Error fetching data from Facebook:', error);
      Alert.alert('Error', 'Failed to retrieve profile information.');
    }
  };

  async function _fbSocialLogin(idToken) {
    console.log('checking token', idToken);
    try {
      const response = await postApi(api_name_fb_login, {
        access_token: idToken,
      });
      return response; // Return the response here
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error so it can be handled in the caller function
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => fbLogin()}>
        <Image
          source={require('../assets/icons/facebook.png')}
          style={[tw`w-9 h-9 self-center mt-1`, {resizeMode: 'contain'}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({});
