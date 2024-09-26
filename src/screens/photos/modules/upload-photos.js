import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
  } from 'react-native';
  import React, {useState} from 'react';
  import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
  import Header from '../../../components/header/header';
  import tw from '../../../styles/tailwind';
  import {Checkbox} from 'react-native-paper';
  import GradientButton from '../../../components/gradient-button/gradient-button';
  
  const UploadPhotos = () => {
    const [value, setValue] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [checked, setChecked] = React.useState(false);
  
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
  
    const handleCameraLaunch = () => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
  
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setSelectedImage(imageUri);
          console.log(imageUri);
        }
      });
    };
  
    return (
      <View style={tw`bg-[#05102E] flex-1`}>
        <Header name="Photos" />
        
        <ScrollView contentContainerStyle={tw`px-5 flex-grow`}>
          <View style={tw`flex-row justify-between mt-4`}>
            <TouchableOpacity onPress={openImagePicker}>
              <Image
                source={require('../../../assets/upload.png')}
                style={[tw`w-35 h-35`, {resizeMode: 'contain'}]}
              />
            </TouchableOpacity>
            <Text
              style={tw`text-[#A9A9A9] text-[20px] font-400 mx-1 mt-1 leading-tight mt-2 self-center`}>
              or
            </Text>
            <TouchableOpacity onPress={handleCameraLaunch}>
              <Image
                source={require('../../../assets/camera.png')}
                style={[tw`w-35 h-35`, {resizeMode: 'contain'}]}
              />
            </TouchableOpacity>
          </View>
  
          <Text
            style={tw`text-[#fff] text-[20px] font-400 mx-1 mt-1 leading-tight mt-8`}>
            Caption
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            placeholder="What are you feeling?"
            maxLength={40}
            onChangeText={text => setValue(text)}
            value={value}
            style={tw`p-6 border-[#fff] border-[1px] mt-2 rounded-lg text-[16px]`}
            textAlignVertical="top" 
          />
        </ScrollView>
  
        <View style={tw`px-5 pb-8`}>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
            <Text
              style={tw`text-[#a2a2a2] text-[20px] font-400 leading-tight ml-2 flex-1`}>
              I agree to acknowledge myself as source of the image
            </Text>
          </View>
  
          <View style={tw`mt-4`}>
            <GradientButton labelShown={'Continue'} />
          </View>
        </View>
      </View>
    );
  };
  
  export default UploadPhotos;
  
  const styles = StyleSheet.create({});
  