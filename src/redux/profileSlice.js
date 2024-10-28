import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApi, postApi} from '../scripts/api-services';
import {
  api_name_change_password,
  api_name_get_profile,
  api_name_updateProfile,
} from '../constants/api-constants';
import Alertify from '../scripts/toast';

// profileData
export const getProfileData = createAsyncThunk(
  'profile/profileData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getApi(api_name_get_profile);
      return response;
    } catch (error) {
      console.log('Error fetching profile API', error);
      return rejectWithValue(error);
    }
  },
);

// updateProfileData
export const updateProfileData = createAsyncThunk(
  'profile/updateProfileData',
  async ({userProfileData, imageData}) => {
    try {
      const formData = new FormData();
      formData.append('name', userProfileData?.name);
      formData.append('email', userProfileData?.email);
      formData.append('contact_number', userProfileData?.contact_number);

      if (Object.keys(imageData)?.length > 0) {
        formData.append('avatar_url', {
          uri: imageData?.uri,
          name: imageData?.name,
          type: imageData?.type,
        });
      }

      const response = await postApi(api_name_updateProfile, formData, {
        'Content-Type': 'multipart/form-data',
      });
      if (response) {
        Alertify.success(response?.data?.message);
      }

      return response;
    } catch (error) {
      Alertify.error(error.message);
      console.log('Error update profile API', error);
    }
  },
);

// change password
export const ChangePasswordApi = createAsyncThunk(
  'profile/changePassword',
  async ({payload, token}) => {
    try {
      const response = await postApi(api_name_change_password, payload, token);
      Alertify.success(response?.data?.message);
      return response;
    } catch (error) {
      Alertify.error(error?.message);
      console.log('Change Password error', error);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoading: false,
    userProfileData: {
      name: '',
      email: '',
      contact_number: '',
    },
    status: '',
  },
  reducers: {
    SetProfileDetails: (state, {payload}) => {
      state.userProfileData = {
        ...state.userProfileData,
        [payload.key]: payload.value,
      };
    },

    setSocialProfile: (state, action) => {
      state.userProfileData = action?.payload?.user;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      state.userProfileData = action?.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getProfileData.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getProfileData.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export const {SetProfileDetails, setSocialProfile} = profileSlice.actions;
export default profileSlice.reducer;
