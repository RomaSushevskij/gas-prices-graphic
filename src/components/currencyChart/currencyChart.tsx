import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

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

import { useAppSelector, useChartData } from '../../hooks';
import { getGasTransactions } from '../../store/selectors';
import { ChartPeriodType, GasPriceUnitsType, TimeFrameOptionsType } from '../../types';
import { TimeRange } from '../Range';
import { Select } from '../Select';

import { GAS_PRICES_UNITS, TIME_FRAMES_OPTIONS } from './constants';
import style from './style/currencyChart.module.scss';
import { getGasTransactionForTimeFrame, getTimeFrame, transformTimeFrame } from './utils';

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

export const CurrencyChart = memo(() => {
  const gasTransactions = useAppSelector(getGasTransactions);

  const [timeFrame, setTimeFrame] = useState<ChartPeriodType>('month');

  const [timeFramesSelectValue, setTimeFramesSelectValue] =
    useState<TimeFrameOptionsType>(TIME_FRAMES_OPTIONS[1]);
  const [gasPriceUnit, setGasPriceUnit] = useState(GAS_PRICES_UNITS[0]);
  const gasTransactionsForTimeFrame = useMemo(() => {
    return getGasTransactionForTimeFrame(
      transformTimeFrame(timeFramesSelectValue),
      gasTransactions,
    );
  }, [timeFramesSelectValue, gasTransactions]);

  const { chartData, setChartData, initialChartData, allTimesPoints } = useChartData(
    gasTransactionsForTimeFrame,
  );

  useEffect(() => {
    const currentTimeFrame = getTimeFrame(chartData);

    setTimeFrame(currentTimeFrame);
  }, [chartData]);

  const data: ChartData<'line'> = useMemo(
    () => ({
      datasets: [
        {
          label: 'Gas price',
          data: chartData,
          borderColor: '#4C8ADA',
          backgroundColor: '#4C8ADA',
          borderWidth: 1.5,
          indexAxis: 'x',
          type: 'line',
        },
      ],
    }),
    [chartData],
  );

  const options: ChartOptions<'line'> = useMemo(
    () => ({
      responsive: true,
      parsing: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        tooltip: {
          cornerRadius: 8,
          boxWidth: 10,
          boxHeight: 10,
          boxPadding: 5,
          callbacks: {
            label(tooltipItem): string | string[] {
              return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue} GWei`;
            },
          },
        },
        legend: {
          display: false,
        },
        decimation: {
          enabled: false,
          algorithm: 'lttb',
          samples: 400,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          type: 'time',
          time: {
            unit: timeFrame,
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    }),
    [timeFrame],
  );

  const onTimeRangeChange = useCallback(
    (dataInterval: number[]) => {
      const startDataIndex = allTimesPoints.indexOf(dataInterval[0]);
      const endDataIndex = allTimesPoints.indexOf(dataInterval[1]);
      const newDataInterval = initialChartData.slice(startDataIndex, endDataIndex);

      setChartData(newDataInterval);
    },
    [timeFramesSelectValue],
  );
  const onTimeFrameSelectChange = useCallback(
    (option: TimeFrameOptionsType) => {
      setTimeFramesSelectValue(option);
      getGasTransactionForTimeFrame(transformTimeFrame(option), gasTransactions);
    },
    [gasTransactions, timeFramesSelectValue, setTimeFramesSelectValue],
  );
  const onGasPriceUnitSelectChange = useCallback(
    (option: GasPriceUnitsType) => {
      setGasPriceUnit(option);
    },
    [setGasPriceUnit],
  );

  return (
    <div className={style.currencyChartWrapper}>
      <div className={style.optionsBlock}>
        <div className={style.selectBlock}>
          <label htmlFor="timeFrameSelect">Time frame:</label>
          <div className={style.select}>
            <Select
              options={TIME_FRAMES_OPTIONS}
              value={timeFramesSelectValue}
              onChangeOption={option => onTimeFrameSelectChange(option)}
              id="timeFrameSelect"
            />
          </div>
        </div>
        <div className={style.selectBlock}>
          <label htmlFor="gasUnits">Value:</label>
          <div className={style.select}>
            <Select
              options={GAS_PRICES_UNITS}
              value={gasPriceUnit}
              onChangeOption={option => onGasPriceUnitSelectChange(option)}
              id="gasUnits"
            />
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
      <TimeRange data={allTimesPoints} onTimeRangeChange={onTimeRangeChange} />
    </div>
  );
});
