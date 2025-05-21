import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getSportsMonkApi} from '../scripts/api-services';
import {
  api_name_fixtures_id,
  api_name_standings,
} from '../constants/api-constants';

export const getAllStandings = createAsyncThunk(
  'standings/getAllStandings',
  async ({lang, currentPage}) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_standings}?include=participant;details.type;&locale=${lang}&page=${currentPage}`,
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
    standingsData: {
      data: [],  // Initially empty data array
      pagination: {},
    },
    lineUpFormations: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllStandings.fulfilled, (state, action) => {
      console.log('API Response:', action.payload); // Log the API response to check the data
    
      const currentPage = action.meta.arg.currentPage; // Get the page number
    
      if (currentPage === 1) {
        // If it's the first page, replace the data
        state.standingsData = action.payload;
      } else {
        // Ensure only 25 items per page by replacing the previous page data
        state.standingsData = {
          ...action.payload, // Keep the new pagination info
          data: action.payload.data, // Replace old data with new page data
        };
      }
    
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
