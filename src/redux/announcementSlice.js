

// show announcements

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_name_new_announcements } from "../constants/api-constants";
import { getApi } from "../scripts/api-services";

export const announcement = createAsyncThunk('announcements/newAnnouncements', async () => {
    try {
      const response = await getApi(`${api_name_new_announcements}`);
      console.log("notification---------", response)
      return response;
    } catch (error) {
      console.log('get announcements listing error', error);
    }
  });

  export const announcementSlice = createSlice({
    name: 'announcement',
  
    initialState: {
      isLoading: false,
      announcementList: [],
    
    },
    reducers: {},
  
    extraReducers: builder => {
      builder.addCase(announcement.pending, (state, action) => {
        state.isLoading = true;
      })
      builder.addCase(announcement.fulfilled, (state, action) => {
        console.log("data",action)
        state.isLoading = false;
        state.announcementList = action?.payload?.data;
      })
      builder.addCase(announcement.rejected, (state, action) => {
        state.isLoading = false;
      });
   
     
    },
  });
  
  export default announcementSlice.reducer;