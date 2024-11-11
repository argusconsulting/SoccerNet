import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getSportsMonkApi} from '../scripts/api-services';
import {api_name_getAllPlayers} from '../constants/api-constants';

export const getAllPlayers = createAsyncThunk(
  'players/allPlayers',
  async countryId => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_getAllPlayers}/${countryId}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching all players by countries API', error);
      return rejectWithValue(error);
    }
  },
);

const playerSlice = createSlice({
  name: 'leagues',
  initialState: {
    isLoading: false,
    allPlayers: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllPlayers.fulfilled, (state, action) => {
      state.allPlayers = action?.payload;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getAllPlayers.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getAllPlayers.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default playerSlice.reducer;
