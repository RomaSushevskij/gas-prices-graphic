import { TransactionType } from '../../../store';

export const getDateLabels = (gasTime: string) => {
  const [fullDate, time] = gasTime.split(' ');
  const [year, month, date] = fullDate.split('-').map(val => Number(val));
  const [hours, minutes] = time.split(':').map(val => Number(val));

  return new Date(Number(`20${year}`), month - 1, date, hours, minutes).getTime();
};

export const createGasChartData = (gasTransactions: TransactionType[]) => {
  const gasPrices = gasTransactions.map(trans => trans.gasPrice);
  const labels = gasTransactions.map(trans => getDateLabels(trans.time));
  const pointsData: { x: number; y: number }[] = [];

  gasPrices.forEach((gasPrice, index) => {
    pointsData.push({ x: labels[index], y: gasPrice });
  });

  return pointsData;
};

export const largestTriangleThreeBuckets = (data: number[][], threshold: number) => {
  const dataLength = data.length;

  if (threshold >= dataLength || threshold === 0) {
    return data;
  }

  const sampled = [];
  let sampledIndex = 0;

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
      avgX += data[avgRangeStart][0] * 1; // * 1 enforces Number (value may be Date)
      avgY += data[avgRangeStart][1] * 1;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Get the range for this bucket
    let rangeOffs = Math.floor((i + 0) * every) + 1;
    const rangeTo = Math.floor((i + 1) * every) + 1;

    // Point a
    const pointAX = data[a][0] * 1; // enforce Number (value may be Date)
    const pointAY = data[a][1] * 1;

    maxArea = -1;
    area = -1;

    for (; rangeOffs < rangeTo; rangeOffs += 1) {
      // Calculate triangle area over three buckets
      const MIDDLE = 0.5;

      area =
        Math.abs(
          (pointAX - avgX) * (data[rangeOffs][1] - pointAY) -
            (pointAX - data[rangeOffs][0]) * (avgY - pointAY),
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

  return sampled;
};
