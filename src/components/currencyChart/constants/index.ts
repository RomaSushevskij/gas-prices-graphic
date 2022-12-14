import { TimeFrameOptionsType } from '../../../types';

export const HOURS_IN_DAY = 24;
export const HOURS_IN_WEEK = 168;
export const HOURS_IN_MONTH = 720;
export const HOURS_IN_YEAR = 8760;
export const TIME_FRAMES_OPTIONS: TimeFrameOptionsType[] = [
  'Last year',
  'Last month',
  'Last week',
  'Last day',
];
export enum timeFrameOption {
  LAST_YEAR = 'Last year',
  LAST_MONTH = 'Last month',
  LAST_WEEK = 'Last week',
  LAST_DAY = 'Last day',
}
export const GAS_PRICES_UNITS = ['Gwei'];
export const THRESHOLD_BETWEEN_POINTS = 300;
