

// show announcements

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_name_all_notifications, api_name_all_notifications_count, api_name_new_announcements, api_name_notification_mark_all_as_read, api_name_notification_mark_as_read } from "../constants/api-constants";
import { getApi, postApi } from "../scripts/api-services";
import Alertify from "../scripts/toast";

export const announcement = createAsyncThunk('announcements/newAnnouncements', async () => {
    try {
      const response = await getApi(`${api_name_new_announcements}`);
      return response;
    } catch (error) {
      console.log('get announcements listing error', error);
    }
  });

  export const notificationsHandler = createAsyncThunk('announcement/allNotifications', async (page) => {
    try {
      const response = await getApi(
        `${api_name_all_notifications}?page=${page}&pageSize={10}`,
      );
      console.log("response", response)
      return response;
    } catch (error) {
      console.log('get notifications listing error', error);
    }
  });

  export const notificationsCount = createAsyncThunk('announcement/allNotificationsCount', async () => {
    try {
      const response = await getApi(`${api_name_all_notifications_count}`);
      return response;
    } catch (error) {
      console.log('get notifications count listing error', error);
    }
  });

  export const notificationsMarkAllAsRead = createAsyncThunk('announcement/allNotificationsMarkRead', async () => {
    try {
      const response = await postApi(`${api_name_notification_mark_all_as_read}`);
      console.log("response", response)
      Alertify.success(response?.data?.message)
      return response;
    } catch (error) {
      console.log('get notifications mark all as read listing error', error);
    }
  });

  export const notificationMarkAsRead = createAsyncThunk(
    'announcement/notificationMarkAsRead',
    async (id) => {
   
      try {
        const response = await postApi(
          `${api_name_notification_mark_as_read}/${id}`,
        );
        Alertify.success(response?.data?.message)
  console.log("response",response)
        return response;
      } catch (error) {
        console.log('get notification mark as read error', error);
        throw error; 
      }
    },
  );

  export const announcementSlice = createSlice({
    name: 'announcement',
  
    initialState: {
      isLoading: false,
      announcementList: [],
    notificationsList: [],
    notificationsCount: '',
    markAsRead:[],
    markAllAsRead:[],
    },
    reducers: {},
  
    extraReducers: builder => {
      builder.addCase(announcement.pending, (state, action) => {
        state.isLoading = true;
      })
      builder.addCase(announcement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.announcementList = action?.payload?.data;
      })
      builder.addCase(announcement.rejected, (state, action) => {
        state.isLoading = false;
      });


      builder.addCase(notificationsHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      builder.addCase(notificationsHandler.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)
        state.isLoading = false;
        state.notificationsList = action.payload;
      });
      
      builder.addCase(notificationsHandler.rejected, (state, action) => {
        state.isLoading = false;
      });
   
     
      builder.addCase(notificationsCount.pending, (state, action) => {
        state.isLoading = true;
      })
      builder.addCase(notificationsCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationsCount = action?.payload?.unread_count;
      })
      builder.addCase(notificationsCount.rejected, (state, action) => {
        state.isLoading = false;
      });

         // mark as Read
         builder.addCase(notificationMarkAsRead.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(notificationMarkAsRead.fulfilled, (state, action) => {
          state.isLoading = false;
          state.markAsRead = action?.payload;
        });

        // mark all as read
        builder
        .addCase(notificationsMarkAllAsRead.fulfilled, (state, action) => {
          state.markAllAsRead = action?.payload;
        });
    },
  });
  
  export default announcementSlice.reducer;