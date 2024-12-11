import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApi, getSportsMonkApi} from '../scripts/api-services';
import {api_name_getTeamSearch, api_name_search} from '../constants/api-constants';

export const searchHandler = createAsyncThunk(
  'search/searchApi',
  async query => {
    try {
      const response = await getApi(`${api_name_search}?name=${query}`);
      return response;
    } catch (error) {
      console.log('Error in search', error);
      return rejectWithValue(error);
    }
  },
);

export const teamSearchHandler = createAsyncThunk(
  'search/teamSearchApi',
  async query => {
    try {
      const response = await getSportsMonkApi(`${api_name_getTeamSearch}/${query}`);
      return response;
    } catch (error) {
      console.log('Error in team search', error);
      return rejectWithValue(error);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isLoading: false,
    isTeamSearchLoading: false,
    searchData: [],
    teamSearchData:[],
    status: '',
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = [];
    },

    clearTeamSearchData: (state, action) => {
      state.teamSearchData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(searchHandler.fulfilled, (state, action) => {
      state.searchData = action?.payload?.groups;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(searchHandler.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(searchHandler.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });

    // team Search data

    builder.addCase(teamSearchHandler.fulfilled, (state, action) => {
      state.teamSearchData = action?.payload?.data;
      state.status = 'fulfilled';
      state.isTeamSearchLoading = false;
    });
    builder.addCase(teamSearchHandler.pending, (state, action) => {
      state.status = 'pending';
      state.isTeamSearchLoading = true;
    });
    builder.addCase(teamSearchHandler.rejected, (state, action) => {
      state.status = 'rejected';
      state.isTeamSearchLoading = false;
    });
  },
});
export const {setSearchData , clearTeamSearchData} = searchSlice.actions;
export default searchSlice.reducer;
