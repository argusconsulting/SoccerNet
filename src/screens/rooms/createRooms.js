import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../../styles/tailwind';
import Header from '../../components/header/header';
import {t} from 'i18next';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {createMeetingRooms} from '../../redux/fanSlice';
import {useNavigation} from '@react-navigation/native';

const CreateRooms = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Initially set to null
  const [open, setOpen] = useState(false);

  const formattedDateTime = selectedDate
    ? moment(selectedDate).format('YYYY-MM-DD HH:mm:ss')
    : ''; // Format only if date is not null

  const onSubmitHandler = () => {
    const reqData = {
      name: roomName,
      description: value,
      schedule_start: formattedDateTime,
    };
    dispatch(createMeetingRooms(reqData)).then(() => {
      setRoomName('');
      setValue(' ');
      setSelectedDate(null);
      navigation.navigate('SpotLight');
    });
  };
  return (
    <View style={tw`bg-[#05102E] flex-1 `}>
      <Header name="Create a Room" />
      <View style={tw`p-5`}>
        <Text
          style={tw`text-[#fff] text-[20px] font-400 mx-1 mt-1 leading-tight mb-2`}>
          Room Name
        </Text>
        <TextInput
          type="text"
          style={tw`border border-[#a9a9a9] text-[#a9a9a9] h-10 w-full rounded-md px-4`}
          placeholder={t('namePlaceholder')}
          value={roomName}
          maxLength={25}
          onChangeText={text => setRoomName(text)}
        />

        <Text
          style={tw`text-[#fff] text-[20px] font-400 mx-1 mt-1 leading-tight mt-8`}>
          Room Description
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          placeholder="What are you feeling?"
          maxLength={40}
          onChangeText={text => setValue(text)}
          value={value}
          style={tw`p-4 border-[#a9a9a9] border-[1px] mt-2 rounded-lg text-[16px]`}
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[
            tw`mt-10 rounded-lg justify-center `,
            {
              width: '100%',
              height: 40,
              alignSelf: 'center',
            },
          ]}>
          <LinearGradient
            colors={['#6A36CE', '#2575F6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              tw`rounded-lg justify-center flex-row`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
              Select Date and Time
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {selectedDate && (
          <Text
            style={tw`text-[#fff] text-[20px] font-400 mx-1 mt-1 leading-tight mt-8`}>
            Selected Date & Time: {formattedDateTime}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => onSubmitHandler()}
          style={[
            tw`mt-30 rounded-lg justify-center `,
            {
              width: '100%',
              height: 40,
              alignSelf: 'center',
            },
          ]}>
          <LinearGradient
            colors={['#6A36CE', '#2575F6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              tw`rounded-lg justify-center flex-row`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
              Create Room
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={selectedDate || new Date()} // Set a default date if date is null
          onConfirm={selectedDate => {
            setOpen(false);
            setSelectedDate(selectedDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default CreateRooms;

const styles = StyleSheet.create({});
