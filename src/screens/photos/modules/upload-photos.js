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
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { t } from 'i18next';
import { postFanPhotos } from '../../../redux/fanPhotosSlice';
  
  const UploadPhotos = () => {
    const [value, setValue] = useState(null);
    const [checked, setChecked] = React.useState(false);

    const [imageData, setImageData] = useState([]);
  
  //for selecting image
  const chooseFile = type => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
      launchImageLibrary(options, response => {

        response?.assets?.map(n => {

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
        console.log("check the data is ",data); 
      }
    });
  };


    
  const dispatch = useDispatch();

const onSubmitHandler = ()=>{
  console.log("enter")
dispatch(postFanPhotos({caption:value , image:imageData ,acknowledge:checked }))
}
  
    return (
      <View style={tw`bg-[#05102E] flex-1`}>
        <Header name="Photos" />
        
        <ScrollView contentContainerStyle={tw`px-5 flex-grow`}>
          <View style={tw`flex-row justify-between mt-4`}>
            <TouchableOpacity onPress={()=> chooseFile()}>
              <Image
                source={require('../../../assets/upload.png')}
                style={[tw`w-35 h-35`, {resizeMode: 'contain'}]}
              />
            </TouchableOpacity>
            <Text
              style={tw`text-[#A9A9A9] text-[20px] font-400 mx-1 mt-1 leading-tight mt-2 self-center`}>
              or
            </Text>
            <TouchableOpacity onPress={captureImage}>
              <Image
                source={require('../../../assets/camera.png')}
                style={[tw`w-35 h-35`, {resizeMode: 'contain'}]}
              />
            </TouchableOpacity>
          </View>


          <Text
            style={tw`text-[#a9a9a9] text-[20px] font-400 mx-1 mt-1 leading-tight mt-8`}>
        {imageData?.name}
          </Text>



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
          <TouchableOpacity
        onPress={() => onSubmitHandler()}
        style={[
          tw`mt-8 mx-2 rounded-md justify-center self-center`,
          {
            width: '100%',
            height: 55,
          },
        ]}>
        <LinearGradient
          colors={['#6A36CE', '#2575F6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            tw`rounded-xl justify-center`,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
          {t('continue')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default UploadPhotos;
  
  const styles = StyleSheet.create({});
  