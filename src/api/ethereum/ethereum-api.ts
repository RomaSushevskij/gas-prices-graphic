import { ethereumAxiosInstance } from './config';
import { GasTransactionsResponse } from './types';

export const ethereumAPI = {
  async fetchGasTransactions() {
    const { data } = await ethereumAxiosInstance.get<GasTransactionsResponse>('');

    return data;
  },
};
