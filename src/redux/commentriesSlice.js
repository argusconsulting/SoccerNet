import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api_name_getCommentriesByFixtureId, api_name_liveScore_inPlay} from '../constants/api-constants';
import {getSportsMonkApi} from '../scripts/api-services';

export const getCommentriesData = createAsyncThunk(
  'commentries/byFixtureId',
  async (fixtureId) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_getCommentriesByFixtureId}/${fixtureId}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching commentries by fixture id', error);
      return rejectWithValue(error);
    }
  },
);

const commentriesSlice = createSlice({
  name: 'commentries',
  initialState: {
    isLoading: false,
    commentriesData: [],
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCommentriesData.fulfilled, (state, action) => {
      state.commentriesData = action?.payload?.data;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getCommentriesData.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getCommentriesData.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export default commentriesSlice.reducer;
