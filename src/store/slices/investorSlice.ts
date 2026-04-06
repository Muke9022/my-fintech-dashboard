import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Investor } from '../../types';
import { investorService } from '../../services/investorService';

export const fetchInvestors = createAsyncThunk('investors/fetchAll', async () => {
  return await investorService.getInvestors();
});

interface InvestorState {
  items: Investor[];
  loading: boolean;
  error: string | null;
}

const initialState: InvestorState = {
  items: [],
  loading: false,
  error: null,
};

const investorSlice = createSlice({
  name: 'investors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInvestors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch investors';
      });
  },
});

export default investorSlice.reducer;