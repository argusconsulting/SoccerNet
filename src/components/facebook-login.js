import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';
import tw from '../styles/tailwind';

const FacebookLogin = () => {
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
      if (!data) throw new Error('No access token found');

      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${data.accessToken}`,
      );
      const userInfo = await response.json();

      console.log('User Info:', userInfo);
      const {id, name, email, picture} = userInfo;

      console.log(`ID: ${id}`);
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Profile Picture URL: ${picture?.data?.url}`);
    } catch (error) {
      console.log('Error fetching data from Facebook:', error);
      Alert.alert('Error', 'Failed to retrieve profile information.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => fbLogin()}>
        <Image
          source={require('../assets/icons/facebook.png')}
          style={[tw`w-9 h-9 self-center `, {resizeMode: 'contain'}]}
        />
      </TouchableOpacity>
      {/* <LoginButton
        // permissions={['public_profile', 'email']}
        onLoginFinished={handleLoginFinished}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({});
