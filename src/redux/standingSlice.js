import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getSportsMonkApi} from '../scripts/api-services';
import {
  api_name_fixtures_id,
  api_name_standings,
} from '../constants/api-constants';

export const getAllStandings = createAsyncThunk(
  'standings/getAllStandings',
  async (lang) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_standings}?include=participant;details.type;&locale=${lang}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching all standing', error);
      return rejectWithValue(error);
    }
  },
);

// for fixtures id with lineups
export const getLineups = createAsyncThunk(
  'standings/lineups',
  async ({fixtureId, lang}) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_fixtures_id}/${fixtureId}?include=formations;lineups;participants&filters=lineupTypes:11&locale=${lang}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching lineup', error);
      return rejectWithValue(error);
    }
  },
);

const standingSlice = createSlice({
  name: 'standings',
  initialState: {
    isLoading: false,
    standingsData: [],
    lineUpFormations: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllStandings.fulfilled, (state, action) => {
      state.standingsData = action?.payload;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getAllStandings.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getAllStandings.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });

    //formation
    builder.addCase(getLineups.fulfilled, (state, action) => {
      state.lineUpFormations = action?.payload?.data;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getLineups.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getLineups.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default standingSlice.reducer;
