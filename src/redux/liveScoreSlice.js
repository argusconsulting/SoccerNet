import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api_name_liveScore_inPlay, api_name_predictions_summary} from '../constants/api-constants';
import {getApi, getSportsMonkApi, postApi} from '../scripts/api-services';

export const getLiveScoresInPlay = createAsyncThunk(
  'liveScore/inPlay',
  async () => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_liveScore_inPlay}?include=participants;league;scores&timezone=Asia/Dubai`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching live data', error);
      return rejectWithValue(error);
    }
  },
);


export const getPredictionSummary = createAsyncThunk(
  'liveScore/predectionSummary',
  async (fixtureId) => {
    try {
      const response = await getApi(
        `${api_name_predictions_summary}?fixture_id=${fixtureId}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching prediction summary data', error);
      return rejectWithValue(error);
    }
  },
);

const liveScoreSlice = createSlice({
  name: 'liveScore',
  initialState: {
    isLoading: false,
    liveScoreInPlayData: [],
    predictionSummaryData: [],
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


    builder.addCase(getPredictionSummary.fulfilled, (state, action) => {
      state.predictionSummaryData = action?.payload;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getPredictionSummary.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getPredictionSummary.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default liveScoreSlice.reducer;
