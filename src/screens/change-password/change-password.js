import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../../styles/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import Alertify from '../../scripts/toast';
import {ChangePasswordApi} from '../../redux/profileSlice';
import Header from '../../components/header/header';
import TextInput from '../../components/library/text-input';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../components/loader/Loader';
import {t} from 'i18next';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth_store.token);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);

  function handleChangePassword() {
    const reqData = {
      current: password,
      new_password: newPassword,
    };

    if (!password) {
      Alertify.error('Please enter your current password');
    } else if (!newPassword) {
      Alertify.error('Please enter your new password');
    } else if (!confirmPassword) {
      Alertify.error('Please enter your confirm password');
    } else if (newPassword !== confirmPassword) {
      Alertify.error('New password and confirm password do not match');
    } else {
      setSubmitLoader(true);
      dispatch(ChangePasswordApi({payload: reqData, token}))
        .then(res => {
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setSubmitLoader(false);
        })
        .catch(() => {
          setSubmitLoader(false);
        });
    }
  }

  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name={'ChangePassword'} />
      <View style={tw`mx-5 mt-10`}>
        <Text
          style={tw`text-[#fff] text-[14px] font-Regular ml-1 leading-tight`}>
          Current Password
        </Text>

        <TextInput
          type="password"
          style={tw`border-b border-[#fff] text-[13px]`}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Current Password"
        />
      </View>
      <View style={tw`mx-5 mt-10`}>
        <Text
          style={tw`text-[#fff] text-[14px] font-Regular ml-1 leading-tight`}>
          New Password
        </Text>

        <TextInput
          type="password"
          style={tw`border-b border-[#fff] text-[13px]`}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          placeholder="New Password"
        />
      </View>
      <View style={tw`mx-5 mt-10`}>
        <Text
          style={tw`text-[#fff] text-[14px] font-Regular ml-1 leading-tight`}>
          Confirm Password
        </Text>

        <TextInput
          type="password"
          style={tw`border-b border-[#fff] text-[13px]`}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
        />
      </View>

      <TouchableOpacity
        onPress={() => handleChangePassword()}
        style={[
          tw`mt-8 mx-5.5 rounded-md justify-center`,
          {
            width: '88%',
            height: 50,
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
          {submitLoader ? (
            <Loader />
          ) : (
            <Text style={tw`text-[#fff] text-[18px] font-400 leading-tight`}>
              {t('ChangePassword')}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
