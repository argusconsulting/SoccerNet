import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, postApi } from "../scripts/api-services";
import { api_name_create_comments, api_name_get_comments, api_name_like_post, api_name_post } from "../constants/api-constants";


export const postHandler = createAsyncThunk('discussion/post', async () => {
    try {
   
      const response = await getApi(`${api_name_post}`);
      console.log("res", response)
   
      return response; 
    } catch (error) {
      console.log('get post list error', error);
      throw error; 
    }
  });

  export const likePostHandler = createAsyncThunk(
    'discussion/likepost',
    async ({reqData}) => {
    
      try {
        const response = await postApi(api_name_like_post, reqData);
        // Alertify.success(response?.data?.message);
        return response;
      } catch (error) {
        // Alertify.error(error?.message);
        console.log('Error like post', error);
      }
    },
  );

  export const getComments = createAsyncThunk('discussion/getComments', async ({post_id}) => {
    try {
 
      const response = await getApi(`${api_name_get_comments}?post_id=${post_id}&limit=50&start=0`);

      return response; 
    } catch (error) {
      console.log('get post list error', error);
      throw error; 
    }
  });

  export const createComments = createAsyncThunk('discussion/createComments', async ({reqData}) => {
    try {
   console.log("reqData create comments", reqData)
      const response = await postApi(api_name_create_comments, reqData);
console.log("response create comments", response)
      return response; 
    } catch (error) {
      console.log('create comments error', error);
      throw error; 
    }
  });

  export const discussionSlice = createSlice({
    name: 'discussion',
  
    initialState: {
      isLoading: false,
      postData: [],
      likePost:[],
      commentsData: null,
      createCommentData: [],
      sendLoader:false,
      getCommentsLoader: false,
    },
    reducers: {},
  
    extraReducers: builder => {
      builder.addCase(postHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postData = action?.payload;
      });

      //like post
      builder.addCase(likePostHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likePostHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likePost = action?.payload;
      });

      //get comments
      builder.addCase(getComments.pending, (state, action) => {
        state.getCommentsLoader = true;
        state.commentsData = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.getCommentsLoader = false;
        state.commentsData = action?.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.getCommentsLoader = false;
        state.commentsData = null; // Optionally handle error case
      });

      //create comments
      builder.addCase(createComments.pending, (state, action) => {
        state.sendLoader = true;
      })
      .addCase(createComments.fulfilled, (state, action) => {
        state.sendLoader = false;
        state.createCommentData = action?.payload;
      });

    }
  });

  export default discussionSlice.reducer;