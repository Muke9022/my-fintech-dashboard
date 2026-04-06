import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Deal } from '../../types';
import { dealService } from '../../services/dealService';

interface DealState {
  items: Deal[];
  loading: boolean;
  error: string | null;
  selectedDeal: Deal | null;
  userInterests: string[];        
  savedDeals: string[];           // (My Interests )
}

const initialState: DealState = {
  items: [],
  loading: false,
  error: null,
  selectedDeal: null,
  userInterests: ['SaaS', 'Fintech', 'HealthTech'],  
  savedDeals: [],                                      
};

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
  const response = await dealService.getDeals();
  return response;
});

const dealSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setSelectedDeal: (state, action: PayloadAction<Deal | null>) => {
      state.selectedDeal = action.payload;
    },

    // ADD: User interest toggle
    toggleInterest: (state, action: PayloadAction<string>) => {
      const industry = action.payload;
      if (state.userInterests.includes(industry)) {
        state.userInterests = state.userInterests.filter(i => i !== industry);
      } else {
        state.userInterests.push(industry);
      }
    },

    // ← ADD: Save/unsave deal (My Interests tab)
    toggleSavedDeal: (state, action: PayloadAction<string>) => {
      const dealId = action.payload;
      if (state.savedDeals.includes(dealId)) {
        state.savedDeals = state.savedDeals.filter(id => id !== dealId);
      } else {
        state.savedDeals.push(dealId);
        //  saving in localStorage 
        if (typeof window !== 'undefined') {
          localStorage.setItem('savedDeals', JSON.stringify(state.savedDeals));
        }
      }
    },
      //load from localstorage when app start
    
    loadSavedDeals: (state) => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('savedDeals');
        if (saved) state.savedDeals = JSON.parse(saved);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deals';
      });
  },
});

export const { 
  setSelectedDeal, 
  toggleInterest,      // EXPORT
  toggleSavedDeal,     // EXPORT
  loadSavedDeals       // EXPORT
} = dealSlice.actions;

export default dealSlice.reducer;