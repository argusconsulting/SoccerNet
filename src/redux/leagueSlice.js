import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api_name_allLeagues} from '../constants/api-constants';
import {getSportsMonkApi} from '../scripts/api-services';

export const getAllLeagues = createAsyncThunk(
  'leagues/allLeagues',
  async ({lang}) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_allLeagues}?locale=${lang}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching leagues API', error);
      return rejectWithValue(error);
    }
  },
);

// export const getLeaguesById = createAsyncThunk(
//   'leagues/byId',
//   async ({leagueId}, {rejectWithValue}) => {
//     try {
//       console.log('Fetching league details for:', leagueId);
//       const response = await getSportsMonkApi(
//         `${api_name_allLeagues}/${leagueId}`,
//       );
//       console.log('iska res', response);
//       return response; // Return the API response
//     } catch (error) {
//       console.error('Error fetching league:', error);
//       return rejectWithValue(error); // Proper error handling
//     }
//   },
// );

const leagueSlice = createSlice({
  name: 'leagues',
  initialState: {
    isLoading: false,
    leagueData: [],
    leagueByIdData: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllLeagues.fulfilled, (state, action) => {
      state.leagueData = action?.payload;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getAllLeagues.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getAllLeagues.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });

    // builder.addCase(getLeaguesById.fulfilled, (state, action) => {
    //   state.leagueByIdData = action?.payload;
    //   state.status = 'fulfilled';
    // });
    // builder.addCase(getLeaguesById.pending, (state, action) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(getLeaguesById.rejected, (state, action) => {
    //   state.status = 'rejected';
    // });
  },
});

export default leagueSlice.reducer;
