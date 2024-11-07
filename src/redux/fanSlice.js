import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApi, postApi} from '../scripts/api-services';
import {api_name_create_fan_rooms} from '../constants/api-constants';
import Alertify from '../scripts/toast';

export const createMeetingRooms = createAsyncThunk(
  'meetingRoom/createRooms',
  async reqData => {
    try {
      console.log('in redux reqdata', reqData);
      const response = await postApi(`${api_name_create_fan_rooms}`, reqData);
      // console.log('bj', response);
      if (response?.status === 201) {
        Alertify.success('Meeting room created successfully');
      }
      return response;
    } catch (error) {
      console.log('error in creating meeting rooms ', error);
      throw error;
    }
  },
);

// get rooms
export const getMeetingRooms = createAsyncThunk(
  'meetingRoom/getRooms',
  async () => {
    try {
      const response = await getApi(`${api_name_create_fan_rooms}`);
      return response;
    } catch (error) {
      console.log('error in creating meeting rooms ', error);
      throw error;
    }
  },
);

// join rooms
export const joinMeetingRooms = createAsyncThunk(
  'meetingRoom/joinRooms',
  async ({userId, groupId}) => {
    const reqData = {
      user_id: userId,
    };
    try {
      const response = await postApi(
        `${api_name_create_fan_rooms}/${groupId}/join`,
        reqData,
      );
      Alertify.success(response?.data?.message);
      return response;
    } catch (error) {
      console.log('error in creating meeting rooms ', error);
      throw error;
    }
  },
);

// join rooms
export const leaveMeetingRooms = createAsyncThunk(
  'meetingRoom/leaveRooms',
  async ({userId, groupId}) => {
    const reqData = {
      user_id: userId,
    };
    try {
      const response = await postApi(
        `${api_name_create_fan_rooms}/${groupId}/leave`,
        reqData,
      );
      Alertify.success('You Leave the room successfully');
      return response;
    } catch (error) {
      console.log('error in creating meeting rooms ', error);
      throw error;
    }
  },
);

// sending message

export const sendMessages = createAsyncThunk(
  'meetingRoom/sendMessages',
  async ({userId, groupId, message}) => {
    const reqData = {
      user_id: userId,
      content: message,
    };
    try {
      const response = await postApi(
        `${api_name_create_fan_rooms}/${groupId}/messages`,
        reqData,
      );

      return response;
    } catch (error) {
      console.log('error in creating meeting rooms ', error);
      throw error;
    }
  },
);

export const getMessages = createAsyncThunk(
  'meetingRoom/getMessages',
  async groupId => {
    try {
      const response = await getApi(
        `${api_name_create_fan_rooms}/${groupId}/messages`,
      );

      console.log('getting res of get mess', response);
      return response;
    } catch (error) {
      console.log('error in get rooms mes ', error);
      throw error;
    }
  },
);

export const meetingRoom = createSlice({
  name: 'meetingRoom',

  initialState: {
    isLoading: false,
    isLoadingMessage: false,
    roomData: [],
    messages: [],
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getMeetingRooms.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMeetingRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roomData = action?.payload?.groups;
      })
      .addCase(getMeetingRooms.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(getMessages.pending, (state, action) => {
        state.isLoadingMessage = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoadingMessage = false;
        state.messages = action?.payload?.messages;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoadingMessage = false;
      });
  },
});

export default meetingRoom.reducer;
