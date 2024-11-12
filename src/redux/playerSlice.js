import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getSportsMonkApi} from '../scripts/api-services';
import {
  api_name_getAllPlayers,
  api_name_getPlayersById,
} from '../constants/api-constants';

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

// playersById
export const getPlayersById = createAsyncThunk(
  'players/playersById',
  async playerId => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_getPlayersById}/${playerId}?include=statistics;country;lineups.details.type;position`,
      );
      console.log('res', response);
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
    playerData: [],
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

    // by Id
    builder.addCase(getPlayersById.fulfilled, (state, action) => {
      state.playerData = action?.payload?.data;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getPlayersById.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getPlayersById.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default playerSlice.reducer;
