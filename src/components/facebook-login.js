import {Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AccessToken,
  LoginManager,
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import tw from '../styles/tailwind';
import {setSocialLoginToken, setUserAuthToken, setUserID} from '../redux/authSlice';
import {store} from '../redux/store';
import {api_name_fb_login, api_name_fb_login_ios} from '../constants/api-constants';
import {postApi} from '../scripts/api-services';
import {setSocialProfile} from '../redux/profileSlice';
import {useNavigation} from '@react-navigation/native';

const FacebookLogin = ({onClose}) => {
  const navigation = useNavigation();

  const fbLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"] , "enabled","nonce");
    if (result.isCancelled) {
      console.log("Login cancelled");
      return;
    }

    console.log("Login success with permissions:", result.grantedPermissions);

    let token = null;

    if (Platform.OS === "ios") {
   
      const authToken = await AuthenticationToken.getAuthenticationTokenIOS();
      token = authToken?.authenticationToken;
      console.log("Auth token (iOS):", token);
    } else {
      const accessToken = await AccessToken.getCurrentAccessToken();
      token = accessToken?.accessToken;
      console.log("Access token (Android):", token);
    }

    // Call getData() only if a token exists for android
    if (token) {
      getData(token);
    } else {
      console.log("No token retrieved for android");
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
let response = null;
    // Send token to backend for authentication
    if(Platform.OS === "ios"){
       response = await _fbSocialLoginIos(token);
    }else{
       response = await _fbSocialLogin(token);
    }
 
    console.log("FB login response:", response);

    // Store user profile and authentication token
    store.dispatch(setSocialProfile(response?.data?.user));
    store.dispatch(setUserAuthToken(response?.data?.token));
    store.dispatch(setUserID(response?.data?.user?.id));
    // Navigate to home screen
    onClose();
    navigation.navigate("LeagueSelection");
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

async function _fbSocialLoginIos(token) {
  try {
    console.log("Sending ios token to backend:", token);
    const response = await postApi(api_name_fb_login_ios, {
      access_token: token,
    });
    return response;
  } catch (error) {
    console.error("Error in ios_fbSocialLogin:", error);
    throw error;
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
