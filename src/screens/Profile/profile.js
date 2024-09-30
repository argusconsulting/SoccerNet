import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/header/header';
import tw from '../../styles/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const Profile = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };


  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Profile" />
      <TouchableOpacity
  onPress={() => openImagePicker()}
  style={tw`bg-[#585858] w-30 h-30 rounded-full self-center justify-center`}>
  {selectedImage ? (
    <>
    <Image
      source={{ uri: selectedImage }}
      style={tw`w-30 h-30 rounded-full`}
    />
    <Image
    source={require('../../assets/edit_profile.png')}
    style={tw`w-8 h-8 absolute bottom-0 right-3`}
  />
  </>
  ) : (
    <>
      <Text
        style={tw`text-[#fff] text-[40px] font-401 leading-normal self-center`}>
        SR
      </Text>
      <Image
        source={require('../../assets/edit_profile.png')}
        style={tw`w-8 h-8 absolute bottom-0 right-3`}
      />
    </>
  )}
</TouchableOpacity>
      <Text
          style={tw`text-[#fff] text-[30px] font-401 leading-normal self-center mt-4`}>
          Sanchit Rastogi
        </Text>
      {/* Profile */}
      <View style={tw`mt-10 flex-row justify-between items-center`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
            <AntDesign
              name={'user'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
          </View>

          <View>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal`}>
              Name
            </Text>
            <Text style={tw`text-[#fff] text-[18px] font-400 leading-normal`}>
              Sanchit Rastogi
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </View>

      {/* Email */}
      <View style={tw`mt-10 flex-row justify-between items-center`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
            <AntDesign
              name={'mail'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
          </View>

          <View>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal`}>
              Email
            </Text>
            <Text style={tw`text-[#fff] text-[18px] font-400 leading-normal`}>
      Sanchit@example.com
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </View>

      {/* Phone */}
      <View style={tw`mt-10 flex-row justify-between items-center`}>
        {/* Icon and Text Group */}
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`bg-[#585858] w-8 h-8 rounded-full justify-center mx-5`}>
            <AntDesign
              name={'phone'}
              size={20}
              color={'#fff'}
              style={tw`self-center`}
            />
          </View>

          <View>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-normal`}>
              Phone
            </Text>
            <Text style={tw`text-[#fff] text-[18px] font-400 leading-normal`}>
          +91 9090909090
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </View>

      {/* settings */}

      <View style={tw`mt-10 flex-row justify-between items-center`}>
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
              Settings
            </Text>
           
          </View>
        </View>

        {/* Arrow Icon */}
        <AntDesign name={'right'} size={20} color={'#fff'} style={tw`mr-5`} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
