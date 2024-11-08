import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileData,
  SetProfileDetails,
  updateProfileData,
} from '../../redux/profileSlice';
import {useNavigation} from '@react-navigation/native';
import Alertify from '../../scripts/toast';
import UploadPopup from '../../components/upload-PopUp';
import {t} from 'i18next';

const Profile = () => {
  const navigation = useNavigation();
  const [uploadPopup, setUploadPopup] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [imageData, setImageData] = useState([]);

  const dispatch = useDispatch();
  const userProfileData = useSelector(state => state.profile.userProfileData);

  //for selecting image
  const chooseFile = type => {
    try {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, response => {
        setUploadPopup(false);
        response?.assets?.map(n => {
          setProfilePicture(n.uri);
          let data = {
            uri: n.uri,
            name: n.fileName,
            type: n.type,
          };
          setImageData(data);
        });
      });
    } catch (error) {
      console.log('Error in choose file', error);
    }
  };

  const captureImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      setUploadPopup(false);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        let fileName = response.assets?.[0]?.fileName || 'captured_image.jpg'; // Provide a default file name
        let type = response.assets?.[0]?.type || 'image/jpeg'; // Provide a default MIME type

        // Structure the data as you did in chooseFile
        let data = {
          uri: imageUri,
          name: fileName,
          type: type,
        };

        // Set the image data to state
        setImageData(data);
        console.log('check the data is ', data);
      }
    });
  };

  const handleUpdateProfile = async () => {
    if (userProfileData.name == '' || userProfileData.name == undefined) {
      Alertify.error('Please enter your first name');
    } else if (
      userProfileData.email == '' ||
      userProfileData.email == undefined
    ) {
      Alertify.error('Please enter your email');
    } else if (
      userProfileData.contact_number == '' ||
      userProfileData.contact_number == undefined
    ) {
      Alertify.error('Please enter your phone');
    } else if (
      userProfileData.country == '' ||
      userProfileData.country == undefined
    ) {
      Alertify.error('Please enter your country');
    } else {
      dispatch(
        updateProfileData({
          userProfileData,
          imageData,
        }),
      ).then(data => {
        dispatch(getProfileData());
      });
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(getProfileData());
    });
    return willFocusSubscription;
  }, [dispatch]);

  //onChange functions
  const handleFieldChange = (key, value) => {
    dispatch(SetProfileDetails(key, value));
  };

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Profile" />

      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        {imageData.uri ? (
          <Pressable
            onPress={() => {
              setUploadPopup(true);
            }}>
            <ImageBackground
              style={tw`w-35 h-35 self-center flex items-end justify-end rounded-full overflow-hidden`}
              source={{uri: imageData.uri}}></ImageBackground>
            <Image
              source={require('../../assets/edit_profile.png')}
              style={tw`w-8 h-8 absolute bottom-1 right-3`}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setUploadPopup(true);
            }}>
            {userProfileData?.avatar_url ? (
              <>
                <View style={tw`flex-row`}>
                  <ImageBackground
                    style={{
                      width: 130,
                      height: 130,
                      alignSelf: 'center',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      overflow: 'hidden',
                      borderRadius: 100,
                    }}
                    source={{
                      uri: `${userProfileData?.avatar_url}`,
                    }}></ImageBackground>
                  <Image
                    source={require('../../assets/edit_profile.png')}
                    style={tw`w-8 h-8 absolute bottom-0 right-3`}
                  />
                </View>
              </>
            ) : (
              <View
                style={tw`bg-[#585858] w-30 h-30 rounded-full self-center justify-center`}>
                <Text
                  style={tw`text-[#fff] text-[40px] font-401 leading-normal self-center`}>
                  SR
                </Text>
                <Image
                  source={require('../../assets/edit_profile.png')}
                  style={tw`w-8 h-8 absolute bottom-0 right-3`}
                />
              </View>
            )}
          </Pressable>
        )}
      </View>

      <Text
        style={tw`text-[#fff] text-[30px] font-401 leading-normal self-center mt-4`}>
        {userProfileData?.name}
      </Text>
      {/* Profile */}

      {uploadPopup && (
        <UploadPopup
          visible={uploadPopup}
          setVisible={() => setUploadPopup(!uploadPopup)}
          handleCamera={() => captureImage('upload-photo')}
          handleGallery={() => chooseFile('photo')}
        />
      )}

      {/* Icon and Text Group */}
      <View style={tw`flex-row items-center mt-7`}>
        <View style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
          <AntDesign
            name={'user'}
            size={20}
            color={'#fff'}
            style={tw`self-center`}
          />
        </View>

        <View>
          <TextInput
            type="text"
            style={tw`border-b border-[#a9a9a9] text-[#a9a9a9]  h-10 w-70 rounded-lg px-2`}
            placeholder={t('namePlaceholder')}
            value={userProfileData?.name}
            maxLength={25}
            onChangeText={text =>
              handleFieldChange({
                key: 'name',
                value: text.slice(0, 25),
              })
            }
          />
        </View>
      </View>

      {/* Email */}

      <View style={tw`flex-row items-center mt-10`}>
        <View style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
          <AntDesign
            name={'mail'}
            size={20}
            color={'#fff'}
            style={tw`self-center`}
          />
        </View>

        <View>
          <TextInput
            type="text"
            style={tw`border-b border-[#a9a9a9] text-[#a9a9a9]  h-10 w-70 rounded-lg px-2 `}
            placeholder={t('emailPlaceholder')}
            value={userProfileData?.email}
            onChangeText={text =>
              handleFieldChange({
                key: 'email',
                value: text,
              })
            }
          />
        </View>
      </View>

      {/* Phone */}

      <View style={tw`flex-row items-center mt-10`}>
        <View style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
          <AntDesign
            name={'phone'}
            size={20}
            color={'#fff'}
            style={tw`self-center`}
          />
        </View>

        <View>
          <TextInput
            type="text"
            style={tw`border-b border-[#a9a9a9] text-[#a9a9a9]  h-10 w-70 rounded-lg px-2`}
            placeholder={t('phonePlaceholder')}
            value={userProfileData?.contact_number}
            onChangeText={text =>
              handleFieldChange({
                key: 'contact_number',
                value: text,
              })
            }
          />
        </View>
      </View>

      <View style={tw`flex-row items-center mt-10`}>
        <View style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
          <AntDesign
            name={'flag'}
            size={20}
            color={'#fff'}
            style={tw`self-center`}
          />
        </View>
        <TextInput
          type="text"
          style={tw`border-b border-[#a9a9a9] text-[#a9a9a9]  h-10 w-70 rounded-lg px-2`}
          placeholder={t('countryPlaceHolder')}
          value={userProfileData?.country}
          maxLength={25}
          onChangeText={text =>
            handleFieldChange({
              key: 'country',
              value: text,
            })
          }
        />
      </View>

      {/* settings */}

      <TouchableOpacity
        style={tw`mt-10 flex-row justify-between items-center`}
        onPress={() => navigation.navigate('Settings')}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
            <AntDesign
              name={'setting'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
          </View>

          <View>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal`}>
              {t('Settings')}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleUpdateProfile}
        style={[
          tw`mt-1 rounded-xl justify-center  mt-10`,
          {
            width: '90%',
            height: 55,
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
            {t('Update')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
