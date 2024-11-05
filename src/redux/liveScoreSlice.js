import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api_name_liveScore_inPlay} from '../constants/api-constants';
import {getSportsMonkApi} from '../scripts/api-services';

export const getLiveScoresInPlay = createAsyncThunk(
  'liveScore/inPlay',
  async () => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_liveScore_inPlay}?include=participants;league;scores;`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching fixtures by date API', error);
      return rejectWithValue(error);
    }
  },
);

const liveScoreSlice = createSlice({
  name: 'liveScore',
  initialState: {
    isLoading: false,
    liveScoreInPlayData: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLiveScoresInPlay.fulfilled, (state, action) => {
      state.liveScoreInPlayData = action?.payload;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getLiveScoresInPlay.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getLiveScoresInPlay.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default liveScoreSlice.reducer;
