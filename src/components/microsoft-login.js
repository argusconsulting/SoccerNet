import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../styles/tailwind';
import {
  authorize,
  refresh,
  revoke,
  prefetchConfiguration,
} from 'react-native-app-auth';
import {useNavigation} from '@react-navigation/native';

const MicrosoftLogin = () => {
  const navigation = useNavigation();
  const configs = {
    identityServer: {
      issuer:
        'https://login.microsoftonline.com/e86379c0-7700-431c-88f4-b519ab723b22',
      clientId: '08b2f43b-a21f-483a-9880-55cc786cf7d1', // Replace with your microsoft client id
      redirectUrl: 'com.soccernet://com.soccernet/android/callback',
      scopes: ['openid', 'profile', 'email', 'phone', 'address'],
      additionalParameters: {
        prompt: 'consent',
      },
    },
    auth0: {
      issuer:
        'https://login.microsoftonline.com/e86379c0-7700-431c-88f4-b519ab723b22',
      clientId: '08b2f43b-a21f-483a-9880-55cc786cf7d1', // Replace with your microsoft client id
      redirectUrl: 'com.soccernet://com.soccernet/android/callback',
      scopes: ['openid', 'profile', 'email', 'phone', 'address'],
      additionalParameters: {
        prompt: 'consent',
      },
    },
  };

  const microsoftSignIn = provider => {
    const config = configs[provider];

    authorize({
      ...config,
      connectionTimeoutSeconds: 5,
      iosPrefersEphemeralSession: true,
    })
      .then(res => {
        console.log('res', res);
        navigation.navigate('LeagueSelection');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => microsoftSignIn('identityServer')}>
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
