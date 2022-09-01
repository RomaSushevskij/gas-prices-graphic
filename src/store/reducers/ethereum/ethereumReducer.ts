import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ethereumAPI } from '../../../api';

import { RequestStatusType, TransactionType } from './types';

export const fetchGasTransactions = createAsyncThunk<
  { transactions: TransactionType[] },
  void,
  { rejectValue: string }
>('ethereum/fetchGasTransactions', async (_, { rejectWithValue }) => {
  try {
    const { ethereum } = await ethereumAPI.fetchGasTransactions();
    const { transactions } = ethereum;

    return { transactions };
  } catch (e) {
    const { message } = e as AxiosError;

    return rejectWithValue(message);
  }
});

const slice = createSlice({
  name: 'ethereum',
  initialState: {
    transactions: [] as TransactionType[],
    status: 'idle' as RequestStatusType,
    message: '' as string | undefined,
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchGasTransactions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGasTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.transactions = action.payload.transactions;
      })
      .addCase(fetchGasTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
      }),
});

export const ethereumReducer = slice.reducer;
