import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSportsMonkApi } from "../scripts/api-services";
import { api_name_getWinningProbabilty } from "../constants/api-constants";


// for showing all leagues
export const getPredictionProbability = createAsyncThunk(
    'AI/prediction',
    async (fixtureId) => {
      try {
        const response = await getSportsMonkApi(
          `${api_name_getWinningProbabilty}/${fixtureId}`,
        );
        return response;
      } catch (error) {
        console.log('Error fetching leagues API', error);
        return rejectWithValue(error);
      }
    },
  );

  const predictionSlice = createSlice({
    name: 'AI',
    initialState: {
      isLoading: false,
      probabilityData: [],
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
  
    }
  });
  
  export default predictionSlice.reducer;