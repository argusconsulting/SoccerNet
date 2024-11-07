import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApi, postApi} from '../scripts/api-services';
import {
  api_name_fan_photos,
  api_name_fan_reaction,
  api_name_post_fan_photos,
} from '../constants/api-constants';
import Alertify from '../scripts/toast';

export const getFanPhotos = createAsyncThunk('fanPhotos/photos', async () => {
  try {
    const response = await getApi(`${api_name_fan_photos}`);
    return response;
  } catch (error) {
    console.log('get fan photos list error', error);
    throw error;
  }
});

export const getFanReactions = createAsyncThunk(
  'reactions/photos',
  async ({id, reaction}) => {
    const reqData = {
      reaction_type: reaction,
    };
    try {
      const response = await postApi(
        `${api_name_fan_reaction}/${id}/react`,
        reqData,
      );
      return response;
    } catch (error) {
      console.log('get fan photos list error', error);
      throw error;
    }
  },
);

export const postFanPhotos = createAsyncThunk(
  'postFanPhotos/photos',
  async ({caption, image, acknowledge}) => {
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('acknowledge', acknowledge);

      if (Object.keys(image)?.length > 0) {
        formData.append('image', {
          uri: image?.uri,
          name: image?.name,
          type: image?.type,
        });
      }

      const response = await postApi(api_name_post_fan_photos, formData, {
        'Content-Type': 'multipart/form-data',
      });
      if (response?.status == 201) {
        Alertify.success('Photo Uploaded Successfully');
      }
      return response;
    } catch (error) {
      console.log('post fan photos error', error);
      throw error;
    }
  },
);

export const fanPhotosSlice = createSlice({
  name: 'fanPhotos',

  initialState: {
    isLoading: false,
    fanPhotos: [],
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getFanPhotos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFanPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fanPhotos = action?.payload;
      })
      .addCase(getFanPhotos.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(postFanPhotos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postFanPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postFanPhotos.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default fanPhotosSlice.reducer;
