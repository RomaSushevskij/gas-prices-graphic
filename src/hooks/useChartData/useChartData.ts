import { useMemo, useState } from 'react';

import { createGasChartData, getDateLabels } from '../../components/currencyChart/utils';
import { TransactionType } from '../../store';

export const useChartData = (gasTransactions: TransactionType[]) => {
  const { initialChartData, allTimesPoints } = useMemo(() => {
    const initialChartData = createGasChartData(gasTransactions);
    const allTimesPoints = gasTransactions.map(trans => getDateLabels(trans.time));

    return { initialChartData, allTimesPoints };
  }, [gasTransactions]);

  const [chartData, setChartData] = useState(initialChartData);

  return {
    chartData,
    setChartData,
    initialChartData,
    allTimesPoints,
  };
};
