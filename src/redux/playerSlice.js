import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getSportsMonkApi} from '../scripts/api-services';
import {
  api_name_getAllPlayers,
  api_name_getPlayersById,
  api_name_getSeasonsById,
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

// yh bhi add kar skte hai lineups.details.type;
// playersById
export const getPlayersById = createAsyncThunk(
  'players/playersById',
  async playerId => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_getPlayersById}/${playerId}?include=statistics.details.type;country;position`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching all players by countries API', error);
      return rejectWithValue(error);
    }
  },
);

export const getSeasonsById = createAsyncThunk(
  'players/seasonsById',
  async seasonId => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_getSeasonsById}/${seasonId}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching all seasons ', error);
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
    allSeasons: [],
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

    // by Id
    builder.addCase(getSeasonsById.fulfilled, (state, action) => {
      const season = action?.payload?.data;
      if (season && season.id) {
        // Store each season by its ID
        state.allSeasons = {
          ...state.allSeasons,
          [season.id]: season,
        };
      }
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getSeasonsById.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getSeasonsById.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default playerSlice.reducer;
