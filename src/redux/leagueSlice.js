import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  api_name_allLeagues,
  api_name_selectedLeagues,
  api_name_sending_selected_leagues,
} from '../constants/api-constants';
import {getApi, getSportsMonkApi, postApi} from '../scripts/api-services';
import Alertify from '../scripts/toast';

export const getAllLeagues = createAsyncThunk(
  'leagues/allLeagues',
  async ({lang}) => {
    try {
      const response = await getApi(`${api_name_allLeagues}?locale=${lang}`);
      return response;
    } catch (error) {
      console.log('Error fetching leagues API', error);
      return rejectWithValue(error);
    }
  },
);

export const getSelectedLeagues = createAsyncThunk(
  'leagues/selectedLeagues',
  async ({lang}) => {
    try {
      const response = await getApi(
        `${api_name_selectedLeagues}?locale=${lang}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching leagues API', error);
      return rejectWithValue(error);
    }
  },
);

export const postSelectedLeagues = createAsyncThunk(
  'leagues/selectedLeagues',
  async leagueIds => {
    try {
      const reqData = {
        leagues: leagueIds,
      };
      const response = await postApi(
        api_name_sending_selected_leagues,
        reqData,
      );
      return response;
    } catch (error) {
      console.log('Error sending selected leagues API', error);
      return rejectWithValue(error);
    }
  },
);

const leagueSlice = createSlice({
  name: 'leagues',
  initialState: {
    isLoading: false,
    leagueData: [],
    selectedLeagues: [],
    isLoadingSelectedLeagues: false,
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

    //selected leagues
    builder.addCase(getSelectedLeagues.fulfilled, (state, action) => {
      state.selectedLeagues = action?.payload;
      state.status = 'fulfilled';
      state.isLoadingSelectedLeagues = false;
    });
    builder.addCase(getSelectedLeagues.pending, (state, action) => {
      state.status = 'pending';
      state.isLoadingSelectedLeagues = true;
    });
    builder.addCase(getSelectedLeagues.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoadingSelectedLeagues = false;
    });
  },
});

export default leagueSlice.reducer;
