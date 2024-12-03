import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApi, postApi} from '../scripts/api-services';
import {
  api_name_active_inactive,
  api_name_create_fan_rooms,
  api_name_get_countries,
  api_name_get_filter,
} from '../constants/api-constants';
import Alertify from '../scripts/toast';

export const createMeetingRooms = createAsyncThunk(
  'meetingRoom/createRooms',
  async reqData => {
    try {
      const response = await postApi(`${api_name_create_fan_rooms}`, reqData);
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

// get filter data

export const getFilterData = createAsyncThunk(
  'meetingRoom/filterData',
  async () => {
    try {
      const response = await getApi(`${api_name_get_countries}`);
      return response;
    } catch (error) {
      console.log('error in creating meeting rooms ', error);
      throw error;
    }
  },
);

// filter
export const filterHandler = createAsyncThunk(
  'meetingRoom/filter',
  async (selectedIds, {rejectWithValue}) => {
    const reqData = {
      country_ids: selectedIds,
    };
    try {
      const response = await postApi(`${api_name_get_filter}`, reqData); // Ensure the correct method (GET/POST)
      return response; // Return the response to be used in the reducer
    } catch (error) {
      console.log('Error in filter API:', error);
      return rejectWithValue(error.message || error); // Reject with an error message if necessary
    }
  },
);

// active / inactive
export const inActiveRoomHandler = createAsyncThunk(
  'meetingRoom/inActive',
  async ({status, groupId}, {rejectWithValue, dispatch}) => {
    // Prepare the request data
    const reqData = {
      is_active: status, // Use the boolean value directly
    };

    try {
      const response = await postApi(
        `${api_name_active_inactive}/${groupId}/toggle-status`,
        reqData,
      );

      dispatch(getMeetingRooms());
      return response;
    } catch (error) {
      console.error('Error in active/inactive API:', error);
      Alertify.error('Only the group creator can update the status');
      // Reject with an error message if necessary
      return rejectWithValue(error.message || error);
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
    filterData: [],
    filterRes: [],
  },
  reducers: {
    setFilterResData: (state, action) => {
      state.filterRes = [];
    },
  },

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

    builder
      .addCase(getFilterData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFilterData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filterData = action?.payload?.data;
      })
      .addCase(getFilterData.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(filterHandler.pending, (state, action) => {
        state.isLoading = true;
        state.filterRes = [];
      })
      .addCase(filterHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filterRes = action?.payload;
      })
      .addCase(filterHandler.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {setFilterResData} = meetingRoom.actions;
export default meetingRoom.reducer;
