// src/features/tarot/slices/tarotSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAllCards, 
  getCardById, 
  getDailyTarot, 
  createReading, 
  getReadingById, 
  getUserReadings,
  getAIInterpretation 
} from '../services/tarotAPI';

// Async thunks
export const fetchAllCards = createAsyncThunk(
  'tarot/fetchAllCards',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCards();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cards');
    }
  }
);

export const fetchCardById = createAsyncThunk(
  'tarot/fetchCardById',
  async (cardId, { rejectWithValue }) => {
    try {
      return await getCardById(cardId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch card');
    }
  }
);

export const fetchDailyTarot = createAsyncThunk(
  'tarot/fetchDailyTarot',
  async (_, { rejectWithValue }) => {
    try {
      return await getDailyTarot();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch daily tarot');
    }
  }
);

export const performReading = createAsyncThunk(
  'tarot/performReading',
  async (readingData, { rejectWithValue }) => {
    try {
      return await createReading(readingData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create reading');
    }
  }
);

export const fetchReadingById = createAsyncThunk(
  'tarot/fetchReadingById',
  async (readingId, { rejectWithValue }) => {
    try {
      return await getReadingById(readingId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch reading');
    }
  }
);

export const fetchUserReadings = createAsyncThunk(
  'tarot/fetchUserReadings',
  async (params, { rejectWithValue }) => {
    try {
      return await getUserReadings(params);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user readings');
    }
  }
);

export const getInterpretation = createAsyncThunk(
  'tarot/getInterpretation',
  async ({ cards, question, readingType }, { rejectWithValue }) => {
    try {
      return await getAIInterpretation(cards, question, readingType);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get AI interpretation');
    }
  }
);

const initialState = {
  cards: [],
  selectedCards: [],
  currentCard: null,
  dailyCard: null,
  readings: [],
  currentReading: null,
  interpretation: '',
  loading: false,
  error: null,
  userReadings: {
    readings: [],
    totalCount: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null
  }
};

const tarotSlice = createSlice({
  name: 'tarot',
  initialState,
  reducers: {
    selectCard: (state, action) => {
      state.selectedCards.push(action.payload);
    },
    unselectCard: (state, action) => {
      state.selectedCards = state.selectedCards.filter(
        card => card.id !== action.payload.id
      );
    },
    clearSelectedCards: (state) => {
      state.selectedCards = [];
    },
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllCards
      .addCase(fetchAllCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchCardById
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchDailyTarot
      .addCase(fetchDailyTarot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyTarot.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyCard = action.payload;
      })
      .addCase(fetchDailyTarot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle performReading
      .addCase(performReading.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performReading.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReading = action.payload;
        state.readings.unshift(action.payload);
      })
      .addCase(performReading.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchReadingById
      .addCase(fetchReadingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReading = action.payload;
      })
      .addCase(fetchReadingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchUserReadings
      .addCase(fetchUserReadings.pending, (state) => {
        state.userReadings.loading = true;
        state.userReadings.error = null;
      })
      .addCase(fetchUserReadings.fulfilled, (state, action) => {
        state.userReadings.loading = false;
        state.userReadings.readings = action.payload.readings;
        state.userReadings.totalCount = action.payload.totalCount;
        state.userReadings.page = action.payload.page;
        state.userReadings.limit = action.payload.limit;
      })
      .addCase(fetchUserReadings.rejected, (state, action) => {
        state.userReadings.loading = false;
        state.userReadings.error = action.payload;
      })
      
      // Handle getInterpretation
      .addCase(getInterpretation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInterpretation.fulfilled, (state, action) => {
        state.loading = false;
        state.interpretation = action.payload.interpretation;
      })
      .addCase(getInterpretation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  selectCard, 
  unselectCard, 
  clearSelectedCards, 
  setCurrentCard,
  clearError
} = tarotSlice.actions;

export default tarotSlice.reducer;