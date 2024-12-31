import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSportsMonkApi } from "../scripts/api-services";
import { api_name_getDoubleChance, api_name_getWinningProbabilty } from "../constants/api-constants";


// for who will win
export const getPredictionProbability = createAsyncThunk(
    'AI/prediction',
    async (fixtureId) => {
      try {
        const response = await getSportsMonkApi(
          `${api_name_getWinningProbabilty}/${fixtureId}`,
        );
        return response;
      } catch (error) {
        console.log('Error fetching probablity API', error);
        return rejectWithValue(error);
      }
    },
  );

  // for double chance
export const getPredictionDoubleChance = createAsyncThunk(
  'AI/doubleChance',
  async (fixtureId) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_getDoubleChance}/${fixtureId}?include=predictions.type`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching double chance API', error);
      return rejectWithValue(error);
    }
  },
);

  const predictionSlice = createSlice({
    name: 'AI',
    initialState: {
      isLoading: false,
      probabilityData: [],
      doubleChanceData:[],
      status: '',
    },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(getPredictionProbability.fulfilled, (state, action) => {
        state.probabilityData = action?.payload?.data;
        state.status = 'fulfilled';
        state.isLoading = false;
      });
      builder.addCase(getPredictionProbability.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
      });
      builder.addCase(getPredictionProbability.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
      });

      //double chnace 
      builder.addCase(getPredictionDoubleChance.fulfilled, (state, action) => {
        state.doubleChanceData = action?.payload?.data;
        state.status = 'fulfilled';
        state.isLoading = false;
      });
      builder.addCase(getPredictionDoubleChance.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
      });
      builder.addCase(getPredictionDoubleChance.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
      });
  
    }
  });
  
  export default predictionSlice.reducer;