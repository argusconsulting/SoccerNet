import {Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
  AuthenticationToken,
  GraphRequest,
  GraphRequestManager,
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

//   const fbLogin = async () => {
//   try {
//     const result = await LoginManager.logInWithPermissions(["public_profile", "email"] , "nonce");
//     if (result.isCancelled) {
//       console.log("Login cancelled");
//       return;
//     }

//     console.log("Login success with permissions:", result.grantedPermissions);

//     let token = null;

//     if (Platform.OS === "ios") {
   
//       const authToken = await AuthenticationToken.getAuthenticationTokenIOS();
//       token = authToken?.authenticationToken;
//       console.log("Auth token (iOS):", token);
//     } else {
//       const accessToken = await AccessToken.getCurrentAccessToken();
//       token = accessToken?.accessToken;
//       console.log("Access token (Android):", token);
//     }

//     // Call getData() only if a token exists
//     if (token) {
//       getData(token);
//     } else {
//       console.log("No token retrieved");
//     }
//   } catch (error) {
//     console.log("Login failed with error:", error);
//     Alert.alert("Error", "Facebook login failed.");
//   }
// };

// const getData = async (token) => {
//   try {
//     console.log("Checking token in getData:", token);

//     if (!token) throw new Error("No access token found");

//     store.dispatch(setSocialLoginToken());

//     // Send token to backend for authentication
//     const response = await _fbSocialLogin(token);
//     console.log("FB login response:", response);

//     // Store user profile and authentication token
//     store.dispatch(setSocialProfile(response?.data?.user));
//     store.dispatch(setUserAuthToken(response?.data?.token));
//     // Navigate to home screen
//     navigation.navigate("LeagueSelection");
//   } catch (error) {
//     console.log("Error fetching data from Facebook:", error);
//     Alert.alert("Error", "Failed to retrieve profile information.");
//   }
// };

// async function _fbSocialLogin(token) {
//   try {
//     console.log("Sending token to backend:", token);
//     const response = await postApi(api_name_fb_login, {
//       access_token: token,
//     });
//     return response;
//   } catch (error) {
//     console.error("Error in _fbSocialLogin:", error);
//     throw error;
//   }
// }



const fbLogin = (resCallback) => {
  // Ensure user is logged out before new login attempt
  LoginManager.logOut();

  // Initiate Facebook Login
  LoginManager.logInWithPermissions(["public_profile", "email"] ,  "enabled")
    .then((result) => {
      console.log("Login Result:", result);

      if (result.isCancelled) {
        console.log("❌ Login cancelled by user");
        return;
      }

      // Fetch Access Token
      return AccessToken.getCurrentAccessToken();
    })
    .then((data) => {
      if (!data) {
        console.log("❌ Failed to get access token");
        return;
      }

      const accessToken = data.accessToken;
      console.log("✅ Access Token:",accessToken);
      console.log("token expiry time ", data);

      // Graph API Request to get user details
      const infoRequest = new GraphRequest(
        "/me?fields=id,name,email,picture",
        { accessToken },
        (error, result) => resCallback(error, result, accessToken) // Pass accessToken here
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    })
    .catch((error) => {
      console.log("❌ Login failed with error:", error);
    });
};

const onFbLogin = async () => {
  try {
    await fbLogin(resCallback);
  } catch (error) {
    console.log("❌ Error in onFbLogin:", error);
  }
};

const resCallback = (error, result, accessToken) => {
  if (error) {
    console.log("❌ Error fetching data:", error);
    return;
  } else {
    const userData = result;
    console.log("✅ Checking user data:", userData);
    store.dispatch(setSocialProfile(userData));
    // store.dispatch(setUserAuthToken(accessToken)); // Now accessToken is correctly passed
    
  }

  console.log("✅ Success fetching data:", result);
};


  return (
    <View>
      <TouchableOpacity onPress={() => onFbLogin()}>
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
