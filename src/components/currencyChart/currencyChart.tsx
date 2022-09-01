import React, { useState } from 'react';

import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Decimation,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';

import { useAppSelector } from '../../hooks';
import { getGasTransactions } from '../../store/selectors';
import { TimeRange } from '../Range/Range';

import style from './style/currencyChart.module.scss';
import { getDateLabels } from './utils/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Decimation,
);

export const CurrencyChart = () => {
  const gasTransactions = useAppSelector(getGasTransactions);

  const [dataInterval, setDataInterval] = useState(gasTransactions);

  const gasPrices = dataInterval.map(trans => trans.gasPrice);
  const gasTimes = gasTransactions.map(trans => getDateLabels(trans.time));
  const labelTimes = dataInterval.map(trans => getDateLabels(trans.time));
  const pointsData: number[][] = [];

  gasPrices.forEach((gasPrice, index) => {
    pointsData.push([gasTimes[index], gasPrice]);
  });
  const data: ChartData<'line'> = {
    labels: labelTimes,
    datasets: [
      {
        data: gasPrices,
        borderColor: '#4C8ADA',
        borderWidth: 1,
        indexAxis: 'x',
        type: 'line',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,

    interaction: {
      intersect: false,
      mode: 'x',
    },
    plugins: {
      legend: {
        display: false,
      },
      decimation: {
        enabled: false,
        algorithm: 'lttb',
        samples: 200,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const onTimeRangeChange = (dataInterval: number[]) => {
    console.log(1);
    const startDataIndex = gasTimes.indexOf(dataInterval[0]);
    const endDataIndex = gasTimes.indexOf(dataInterval[1]);
    const newDataInterval = gasTransactions.slice(startDataIndex, endDataIndex);

    setDataInterval(newDataInterval);
  };

  return (
    <div className={style.currencyChartWrapper}>
      <Line options={options} data={data} />
      <TimeRange data={gasTimes} onRangeChange={onTimeRangeChange} />
    </div>
  );
};
