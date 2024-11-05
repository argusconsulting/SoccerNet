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

const CreateRooms = () => {
  const [value, setValue] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formattedDateTime = moment(date).format('YYYY-MM-DD , HH:mm:ss');
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
          style={tw`border border-[#a9a9a9] text-[#a9a9a9]  h-10 w-full rounded-md px-4`}
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
            start={{x: 0, y: 0}} // Start from top left
            end={{x: 1, y: 1}} // End at bottom right
            style={[
              tw`rounded-lg justify-center , flex-row`,
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={tw`text-[#fff] text-[20px] font-401 leading-tight`}>
              Select Date and Time
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={tw`text-[#fff] text-[20px] font-400 mx-1 mt-1 leading-tight mt-8`}>
          Selected Date & Time: {formattedDateTime}
        </Text>

        <TouchableOpacity
          onPress={() => setOpen(true)}
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
            start={{x: 0, y: 0}} // Start from top left
            end={{x: 1, y: 1}} // End at bottom right
            style={[
              tw`rounded-lg justify-center , flex-row`,
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
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
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
