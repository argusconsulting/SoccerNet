import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api_name_allLeagues} from '../constants/api-constants';
import {getSportsMonkApi} from '../scripts/api-services';

export const getAllLeagues = createAsyncThunk(
  'leagues/allLeagues',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getSportsMonkApi(api_name_allLeagues);
      return response;
    } catch (error) {
      console.log('Error fetching leagues API', error);
      return rejectWithValue(error);
    }
  },
);

// export const getAllFixturesByLeagues = createAsyncThunk(
//   'leagues/allLeagues',
//   async (_, {rejectWithValue}) => {
//     try {
//       const response = await getSportsMonkApi(api_name_allLeagues);
//       return response;
//     } catch (error) {
//       console.log('Error fetching leagues API', error);
//       return rejectWithValue(error);
//     }
//   },
// );

const leagueSlice = createSlice({
  name: 'leagues',
  initialState: {
    isLoading: false,
    leagueData: [],
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
  },
});

export default leagueSlice.reducer;
