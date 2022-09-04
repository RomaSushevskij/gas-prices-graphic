import { TransactionType } from '../../../store';
import { ChartFrameType, ChartPointType, TimeFrameOptionsType } from '../../../types';
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
export const getTimeFrame = (chartData: ChartPointType[]): ChartFrameType => {
  if (chartData.length <= HOURS_IN_DAY) return 'hour';
  if (chartData.length <= HOURS_IN_WEEK) return 'day';
  if (chartData.length <= HOURS_IN_MONTH) return 'day';
  if (chartData.length <= HOURS_IN_YEAR) return 'month';

  return 'year';
};
export const getGasTransactionForTimeFrame = (
  timeFrame: ChartFrameType,
  gasTransactions: TransactionType[],
): TransactionType[] => {
  switch (timeFrame) {
    case 'year':
      if (gasTransactions.length > HOURS_IN_YEAR) {
        const FIRST_POINT_OF_LAST_YEAR = gasTransactions.length - HOURS_IN_YEAR;

        return gasTransactions.slice(FIRST_POINT_OF_LAST_YEAR);
      }

      return gasTransactions;
    case 'month':
      if (gasTransactions.length > HOURS_IN_MONTH) {
        const FIRST_POINT_OF_LAST_MONTH = gasTransactions.length - HOURS_IN_MONTH;

        return gasTransactions.slice(FIRST_POINT_OF_LAST_MONTH);
      }

      return gasTransactions;
    case 'week':
      if (gasTransactions.length > HOURS_IN_WEEK) {
        const FIRST_POINT_OF_LAST_WEEK = gasTransactions.length - HOURS_IN_WEEK;

        return gasTransactions.slice(FIRST_POINT_OF_LAST_WEEK);
      }

      return gasTransactions;
    case 'day':
      if (gasTransactions.length > HOURS_IN_DAY) {
        const FIRST_POINT_OF_LAST_DAY = gasTransactions.length - HOURS_IN_DAY;

        return gasTransactions.slice(FIRST_POINT_OF_LAST_DAY);
      }

      return gasTransactions;
    default: {
      return gasTransactions;
    }
  }
};

export const transformTimeFrame = (option: TimeFrameOptionsType): ChartFrameType => {
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

export const largestTriangleThreeBuckets = (
  data: ChartPointType[],
  threshold: number,
) => {
  const dataLength = data.length;

  if (threshold >= dataLength || threshold === 0) {
    return data;
  }

  const sampled = [];
  let sampledIndex = -1;

  // Bucket size. Leave room for start and end data points
  const TWO = 2;
  const every = (dataLength - TWO) / (threshold - TWO);

  let a = 0; // Initially a is the first point in the triangle
  let maxAreaPoint;
  let maxArea;
  let area;
  let nextA;

  sampled[(sampledIndex += 1)] = data[a]; // Always add the first point

  for (let i = 0; i < threshold - TWO; i += 1) {
    // Calculate point average for next bucket (containing c)
    let avgX = 0;
    let avgY = 0;
    let avgRangeStart = Math.floor((i + 1) * every) + 1;
    let avgRangeEnd = Math.floor((i + TWO) * every) + 1;

    avgRangeEnd = avgRangeEnd < dataLength ? avgRangeEnd : dataLength;

    const avgRangeLength = avgRangeEnd - avgRangeStart;

    for (; avgRangeStart < avgRangeEnd; avgRangeStart += 1) {
      avgX += data[avgRangeStart].x * 1; // * 1 enforces Number (value may be Date)
      avgY += data[avgRangeStart].y * 1;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Get the range for this bucket
    let rangeOffs = Math.floor((i + 0) * every) + 1;
    const rangeTo = Math.floor((i + 1) * every) + 1;

    // Point a
    const pointAX = data[a].x * 1; // enforce Number (value may be Date)
    const pointAY = data[a].y * 1;

    maxArea = -1;
    area = -1;

    for (; rangeOffs < rangeTo; rangeOffs += 1) {
      // Calculate triangle area over three buckets
      const MIDDLE = 0.5;

      area =
        Math.abs(
          (pointAX - avgX) * (data[rangeOffs].y - pointAY) -
            (pointAX - data[rangeOffs].x) * (avgY - pointAY),
        ) * MIDDLE;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[rangeOffs];
        nextA = rangeOffs; // Next a is this b
      }
    }

    sampled[(sampledIndex += 1)] = maxAreaPoint; // Pick this point from the bucket
    // @ts-ignore
    a = nextA; // This a is the next a (chosen b)
  }

  sampled[(sampledIndex += 1)] = data[dataLength - 1]; // Always add last

  return sampled as ChartPointType[];
};
