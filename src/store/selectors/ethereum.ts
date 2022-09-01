import { RequestStatusType } from '../../types';
import { AppStateType } from '../types';

export const getGasTransactions = (state: AppStateType) => state.ethereum.transactions;
export const getStatus = (state: AppStateType): RequestStatusType =>
  state.ethereum.status;
