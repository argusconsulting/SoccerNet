import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
  AuthenticationToken,
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

  const fbLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"], "limited", "my_nonce");

    if (result.isCancelled) {
      console.log("Login cancelled");
      return;
    }

    console.log("Login success with permissions:", result.grantedPermissions);

    let token = null;

    if (Platform.OS === "ios") {
      // Get authentication token for iOS Limited Login Mode
      const authToken = await AuthenticationToken.getAuthenticationTokenIOS();
      token = authToken?.authenticationToken;
      console.log("Auth token (iOS):", token);
    } else {
      // Get access token for Android (works with Graph API)
      const accessToken = await AccessToken.getCurrentAccessToken();
      token = accessToken?.accessToken;
      console.log("Access token (Android):", token);
    }

    // Call getData() only if a token exists
    if (token) {
      getData(token);
    } else {
      console.log("No token retrieved");
    }
  } catch (error) {
    console.log("Login failed with error:", error);
    Alert.alert("Error", "Facebook login failed.");
  }
};

const getData = async (token) => {
  try {
    console.log("Checking token in getData:", token);

    if (!token) throw new Error("No access token found");

    store.dispatch(setSocialLoginToken());

    // Send token to backend for authentication
    const response = await _fbSocialLogin(token);
    console.log("FB login response:", response);

    // Store user profile and authentication token
    store.dispatch(setSocialProfile(response?.data?.user));
    store.dispatch(setUserAuthToken(response?.data?.token));

    // Navigate to home screen
    navigation.navigate("Home");
  } catch (error) {
    console.log("Error fetching data from Facebook:", error);
    Alert.alert("Error", "Failed to retrieve profile information.");
  }
};

async function _fbSocialLogin(token) {
  try {
    console.log("Sending token to backend:", token);
    const response = await postApi(api_name_fb_login, {
      access_token: token,
    });
    return response;
  } catch (error) {
    console.error("Error in _fbSocialLogin:", error);
    throw error;
  }
}

  // const fbLogin = async () => {
  //   // try {
  //   //   const result = await LoginManager.logInWithPermissions(
  //   //     [
  //   //       "public_profile",
  //   //       "email",
  //   //     ],
  //   //     "limited",
  //   //     "my_nonce", // Optional
  //   //   );
  //   //   console.log(result);
  //   //   if (Platform.OS === "ios") {
  //   //     // This token **cannot** be used to access the Graph API.
  //   //     // https://developers.facebook.com/docs/facebook-login/limited-login/
  //   //     const result = await AuthenticationToken.getAuthenticationTokenIOS();
        
  //   //     console.log("auth token-----",result?.authenticationToken);
  //   //   } else {
  //   //     // This token can be used to access the Graph API.
  //   //     const result = await AccessToken.getCurrentAccessToken();
  //   //     console.log("Access token-----",result?.accessToken);
        
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   LoginManager.logInWithPermissions(['public_profile']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log(
  //           'Login success with permissions: ' +
  //             result.grantedPermissions.toString(),
  //         );
  //         getData();
  //       }
  //     },
  //     function (error) {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // };

  // const getData = async () => {
  //   try {
  //     const data = await AccessToken.getCurrentAccessToken();
  //     console.log("checking data in getdata-------", data)
  //     var idToken = data?.accessToken;
  //     store.dispatch(setSocialLoginToken());
  //     const response = await _fbSocialLogin(idToken);
  //     // console.log('checking response now here ', response);
  //     store.dispatch(setSocialProfile(response?.data?.user));
  //     store.dispatch(setUserAuthToken(response?.data?.token));
  //     navigation.navigate('Home');
  //     if (!data) throw new Error('No access token found');
  //   } catch (error) {
  //     console.log('Error fetching data from Facebook:', error);
  //     Alert.alert('Error', 'Failed to retrieve profile information.');
  //   }
  // };

  // async function _fbSocialLogin(idToken) {
  //   console.log('checking token', idToken);
  //   try {
  //     const response = await postApi(api_name_fb_login, {
  //       access_token: idToken,
  //     });
  //     return response; // Return the response here
  //   } catch (error) {
  //     console.error(error);
  //     throw error; // Rethrow the error so it can be handled in the caller function
  //   }
  // }

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
