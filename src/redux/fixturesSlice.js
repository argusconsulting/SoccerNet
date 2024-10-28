import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api_name_fixtures_date} from '../constants/api-constants';
import {getSportsMonkApi} from '../scripts/api-services';

export const getAllFixturesByDate = createAsyncThunk(
  'fixtures/byDate',
  async currentDate => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_fixtures_date}/${currentDate}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching fixtures by date API', error);
      return rejectWithValue(error);
    }
  },
);

const fixtureSlice = createSlice({
  name: 'leagues',
  initialState: {
    isLoading: false,
    fixturesByDate: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllFixturesByDate.fulfilled, (state, action) => {
      state.fixturesByDate = action?.payload;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getAllFixturesByDate.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getAllFixturesByDate.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default fixtureSlice.reducer;
