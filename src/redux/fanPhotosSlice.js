import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../scripts/api-services";
import { api_name_fan_photos } from "../constants/api-constants";



export const getFanPhotos = createAsyncThunk('fanPhotos/photos', async () => {
    try {
   
      const response = await getApi(`${api_name_fan_photos}`);
      console.log("res----->", response)
   
      return response; 
    } catch (error) {
      console.log('get fan photos list error', error);
      throw error; 
    }
  });


  export const fanPhotosSlice = createSlice({
    name: 'fanPhotos',
  
    initialState: {
      isLoading: false,
      fanPhotos: [],
    },
    reducers: {},
  
    extraReducers: builder => {
      builder.addCase(getFanPhotos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFanPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fanPhotos = action?.payload;
      })
      .addCase(getFanPhotos.rejected, (state, action) => {
        state.isLoading = false;
      });

     
    }
  });

  export default fanPhotosSlice.reducer;