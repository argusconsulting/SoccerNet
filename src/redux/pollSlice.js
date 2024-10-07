import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_name_get_poll, api_name_poll_vote } from "../constants/api-constants";
import { getApi, postApi } from "../scripts/api-services";

export const getPollData = createAsyncThunk(
    'poll/pollData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getApi(api_name_get_poll);
        console.log('response get poll data', response);
        return response;
      } catch (error) {
        console.log('Error fetching poll API', error);
        return rejectWithValue(error);
      }
    }
  );


    //   poll vote
    export const pollVoteData = createAsyncThunk(
        'poll/pollVoteData',
        async (_, { id }) => {
        try {
            const response = await postApi(`${api_name_poll_vote}/${id}`);
            console.log('response vote poll data', response);
            return response;
        } catch (error) {
            console.log('Error sending vote poll API', error);
            return error;
        }
        }
    );

  const pollSlice = createSlice({
    name: 'profile',
    initialState: {
      isLoading: false,
     userPollData:[],
     pollVoteData:[],
      status: '',
  },
  reducers: {
  

},
    extraReducers: (builder) => {
      builder.addCase(getPollData.fulfilled, (state, action) => {
        state.userPollData = action?.payload?.polls;
        state.status = 'fulfilled';
    });
    builder.addCase(getPollData.pending, (state, action) => {
        state.status = 'pending';
    });
    builder.addCase(getPollData.rejected, (state, action) => {
        state.status = 'rejected';
    });

    // vote poll

    builder.addCase(pollVoteData.fulfilled, (state, action) => {
        state.pollVoteData = action?.payload?.polls;
        state.status = 'fulfilled';
    });
    builder.addCase(pollVoteData.pending, (state, action) => {
        state.status = 'pending';
    });
    builder.addCase(pollVoteData.rejected, (state, action) => {
        state.status = 'rejected';
    });
    },
  });

  export default pollSlice.reducer;