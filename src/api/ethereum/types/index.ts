import { TransactionType } from '../../../store';

export type GasTransactionsResponse = {
  ethereum: {
    transactions: TransactionType[];
  };
};
