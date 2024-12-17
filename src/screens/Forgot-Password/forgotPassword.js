import { ActivityIndicator, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from '../../styles/tailwind'
import TextInput from '../../components/library/text-input'
import LinearGradient from 'react-native-linear-gradient'
import { postApi } from '../../scripts/api-services'
import { api_name_forgotPassword } from '../../constants/api-constants'
import { validateEmail } from '../../scripts/validations'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/header/header'

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [value, setValue] = useState('')
    const [submitLoader, setSubmitLoader] = useState(false)

    async function handleSubmit() {
   
        try {
        
            if (value == '') {
              ToastAndroid.show('Please enter your Email', ToastAndroid.LONG);
            } else if (!validateEmail(value)) {
              ToastAndroid.show('Please enter a valid email address.', ToastAndroid.LONG);
              
            } else {
         
              setSubmitLoader(true)
                postApi(`${api_name_forgotPassword}?email=${value}`)
                    .then(async (response) => {
                      console.log("response",response)
                      ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
                        if (response?.data?.status) {
                            navigation.navigate('Login');
                            setSubmitLoader(false)
                        } 
                    })
                    .catch((error) => {
                   
                      setSubmitLoader(false)
                        console.log('forgot password Error', error?.message);
                    });
            }
        } catch (error) {
            console.log('forgot password Error ', error);
        }
    }
  return (
    <SafeAreaView  style={tw`flex-1 bg-[#05102E] mt-7 `}>
     <Header name={"Forgot Password"}/>

     <View style={tw`mt-10 mx-5`}>
          <Text style={tw`text-[#697586] text-[14px] font-Regular ml-1 leading-tight mb-3`}>Email</Text>

          <TextInput
            type="text"
            style={tw`border-b border-[#2575F6] text-[13px]`}
            placeholder="Enter your email"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
        </View>

        <TouchableOpacity
  onPress={()=> handleSubmit()}
          style={[
            tw`mt-8 mx-5 rounded-md justify-center`,
            {
              width: '90%',
              height: 40, 
            },
          ]}>
          <LinearGradient
            colors={['#6A36CE', '#2575F6']}
            start={{x: 0, y: 0}} // Start from top left
            end={{x: 1, y: 1}} // End at bottom right
            style={[
              tw`rounded-md justify-center`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            
            {submitLoader ? <ActivityIndicator color={"#000"} size={"small"}/>:
            <Text style={tw`text-[#fff] text-[14px] font-400 leading-tight`}>
              Submit
            </Text>}
          </LinearGradient>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})