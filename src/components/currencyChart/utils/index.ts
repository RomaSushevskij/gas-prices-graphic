import { TransactionType } from '../../../store';
import { ChartPeriodType, ChartPointType, TimeFrameOptionsType } from '../../../types';
import { HOURS_IN_DAY, HOURS_IN_MONTH, HOURS_IN_WEEK, HOURS_IN_YEAR } from '../constants';

export const getDateLabels = (gasTime: string): number => {
  const [fullDate, time] = gasTime.split(' ');
  const [year, month, date] = fullDate.split('-').map(val => Number(val));
  const [hours, minutes] = time.split(':').map(val => Number(val));

  return new Date(Number(`20${year}`), month - 1, date, hours, minutes).getTime();
};

export const createGasChartData = (
  gasTransactions: TransactionType[],
): ChartPointType[] => {
  const gasPricesDataY = gasTransactions.map(trans => trans.gasPrice);
  const gasTimesDataX = gasTransactions.map(trans => getDateLabels(trans.time));
  const pointsData: ChartPointType[] = [];

  gasPricesDataY.forEach((gasPrice, index) => {
    pointsData.push({ x: gasTimesDataX[index], y: gasPrice });
  });

  return pointsData;
};
export const getTimeFrame = (chartData: ChartPointType[]): ChartPeriodType => {
  if (chartData.length <= HOURS_IN_DAY) return 'hour';
  if (chartData.length <= HOURS_IN_WEEK) return 'day';
  if (chartData.length <= HOURS_IN_MONTH) return 'day';
  if (chartData.length <= HOURS_IN_YEAR) return 'month';

  return 'year';
};
export const getGasTransactionForTimeFrame = (
  timeFrame: ChartPeriodType,
  gasTransactions: TransactionType[],
): TransactionType[] => {
  switch (timeFrame) {
    case 'year':
      if (gasTransactions.length > HOURS_IN_YEAR) {
        return gasTransactions.slice(gasTransactions.length - HOURS_IN_YEAR);
      }

      return gasTransactions;
    case 'month':
      if (gasTransactions.length > HOURS_IN_MONTH) {
        return gasTransactions.slice(gasTransactions.length - HOURS_IN_MONTH);
      }

      return gasTransactions;
    case 'week':
      if (gasTransactions.length > HOURS_IN_WEEK) {
        return gasTransactions.slice(gasTransactions.length - HOURS_IN_WEEK);
      }

      return gasTransactions;
    case 'day':
      if (gasTransactions.length > HOURS_IN_DAY) {
        return gasTransactions.slice(gasTransactions.length - HOURS_IN_DAY);
      }

      return gasTransactions;
    default: {
      return gasTransactions;
    }
  }
};

export const transformTimeFrame = (option: TimeFrameOptionsType): ChartPeriodType => {
  switch (option) {
    case 'Last day':
      return 'day';
    case 'Last week':
      return 'week';
    case 'Last month':
      return 'month';
    case 'Last year':
      return 'year';
    default:
      return 'month';
  }
};
