import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../styles/tailwind';
import {authorize} from 'react-native-app-auth';
import {useNavigation} from '@react-navigation/native';
import {store} from '../redux/store';
import {setSocialProfile} from '../redux/profileSlice';
import {setUserAuthToken, setUserID} from '../redux/authSlice';
import { api_name_microsoft_login } from '../constants/api-constants';
import { postApi } from '../scripts/api-services';

const MicrosoftLogin = ({onClose}) => {
  const navigation = useNavigation();

  const config = {
    issuer: 'https://login.microsoftonline.com/e86379c0-7700-431c-88f4-b519ab723b22', 
    clientId: '08b2f43b-a21f-483a-9880-55cc786cf7d1',
    redirectUrl: 'com.soccernet://com.soccernet/android/callback',
    scopes: ['openid', 'profile', 'email', 'User.Read', 'offline_access'],
    additionalParameters: {
      prompt: 'consent',
    },
    serviceConfiguration: {
      authorizationEndpoint: 'https://login.microsoftonline.com/e86379c0-7700-431c-88f4-b519ab723b22/oauth2/v2.0/authorize',
      tokenEndpoint: 'https://login.microsoftonline.com/e86379c0-7700-431c-88f4-b519ab723b22/oauth2/v2.0/token',
    },
  };

  const microsoftSignIn = async () => {
    try {
      const authResult = await authorize(config);
      console.log('Auth Result:', authResult);

      // const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${authResult.accessToken}`,
      //   },
      // });

      // const userInfo = await userInfoResponse.json();
      // console.log('User Info:', userInfo);
      const response = await _microsoftSocialLogin(authResult?.accessToken);

     store.dispatch(setSocialProfile(response?.data));
          store.dispatch(setUserAuthToken(response?.data?.token));
          store.dispatch(setUserID(response?.data?.user?.id));

      onClose();
      navigation.navigate('LeagueSelection');
    } catch (err) {
      console.log('Microsoft Login Error:', err);
    }
  };

    async function _microsoftSocialLogin(idToken) {
      console.log('microsoft token', idToken);
      try {
        const response = await postApi(api_name_microsoft_login, {
          access_token: idToken,
        
        });
        console.log('microsoft res', response);
  
        return response; // Return the response here
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so it can be handled in the caller function
      }
    }

  return (
    <View>
      <TouchableOpacity onPress={microsoftSignIn}>
        <Image
          source={require('../assets/icons/ms.png')}
          style={[tw`w-7 h-7 self-center mr-7 mt-2`, {resizeMode: 'contain'}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MicrosoftLogin;

const styles = StyleSheet.create({});

