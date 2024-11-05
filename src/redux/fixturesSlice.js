import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  api_name_fixtures_date,
  api_name_fixtures_date_range,
  api_name_fixtures_id,
  api_name_type_id,
} from '../constants/api-constants';
import {getSportsMonkApi, getSportsMonkCoreApi} from '../scripts/api-services';

export const getAllFixturesByDate = createAsyncThunk(
  'fixtures/byDate',
  async currentDate => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_fixtures_date}/${currentDate}?include=participants;league;scores;`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching fixtures by date API', error);
      return rejectWithValue(error);
    }
  },
);

// for calendar
export const getAllFixturesByDateRange = createAsyncThunk(
  'fixtures/byDateRange',
  async ({start, end}) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_fixtures_date_range}/${start}/${end}?per_page=200&filters=populate`,
      );

      return response;
    } catch (error) {
      console.log('Error fetching fixtures by date range API', error);
      return rejectWithValue(error);
    }
  },
);

// for highlights
export const getAllFixturesByDateRangeHighlights = createAsyncThunk(
  'fixtures/byDateRangeHighlights',
  async ({start, end}) => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_fixtures_date_range}/${start}/${end}?per_page=20&include=participants;league;scores;`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching fixtures by date range API', error);
      return rejectWithValue(error);
    }
  },
);

// for fixtures id
export const getFixturesById = createAsyncThunk(
  'fixtures/byFixturesId',
  async fixtureId => {
    try {
      const response = await getSportsMonkApi(
        `${api_name_fixtures_id}/${fixtureId}?include=participants;league;scores;statistics;`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching fixtures by id API', error);
      return rejectWithValue(error);
    }
  },
);

// for type
export const getTypeById = createAsyncThunk(
  'fixtures/byTypeId',
  async typeId => {
    try {
      const response = await getSportsMonkCoreApi(
        `${api_name_type_id}/${typeId}`,
      );
      return response;
    } catch (error) {
      console.log('Error fetching fixtures by id API', error);
      return rejectWithValue(error);
    }
  },
);

const fixtureSlice = createSlice({
  name: 'leagues',
  initialState: {
    isLoading: false,
    isLoadingDetail: false,
    loading: false,
    fixturesByDate: [],
    fixturesByDateRange: [],
    fixturesByDateRangeHighlights: [],
    fixturesById: [],
    typeNames: [],
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

    // by date range for calendar
    builder.addCase(getAllFixturesByDateRange.fulfilled, (state, action) => {
      state.fixturesByDateRange = action?.payload?.data;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(getAllFixturesByDateRange.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(getAllFixturesByDateRange.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });

    // for highlights
    builder.addCase(
      getAllFixturesByDateRangeHighlights.fulfilled,
      (state, action) => {
        state.fixturesByDateRangeHighlights = action?.payload?.data;
        state.status = 'fulfilled';
        state.isLoading = false;
      },
    );
    builder.addCase(
      getAllFixturesByDateRangeHighlights.pending,
      (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
      },
    );
    builder.addCase(
      getAllFixturesByDateRangeHighlights.rejected,
      (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
      },
    );

    // by fixtures id
    builder.addCase(getFixturesById.fulfilled, (state, action) => {
      state.fixturesById = action?.payload?.data;
      state.status = 'fulfilled';
      state.isLoadingDetail = false;
    });
    builder.addCase(getFixturesById.pending, (state, action) => {
      state.status = 'pending';
      state.isLoadingDetail = true;
    });
    builder.addCase(getFixturesById.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoadingDetail = false;
    });

    // by type id
    builder.addCase(getTypeById.fulfilled, (state, action) => {
      const typeInfo = action?.payload?.data;
      state.typeNames[typeInfo.id] = typeInfo;
      state.status = 'fulfilled';
      state.loading = false;
    });
    builder.addCase(getTypeById.pending, (state, action) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getTypeById.rejected, (state, action) => {
      state.status = 'rejected';
      state.loading = false;
    });
  },
});

export default fixtureSlice.reducer;
