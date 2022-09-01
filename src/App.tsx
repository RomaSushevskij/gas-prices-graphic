import { useEffect } from 'react';

import style from './App.module.scss';
import { CurrencyChart } from './components';
import { Preloader } from './components/Preloader';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchGasTransactions } from './store/reducers/ethereum/ethereumReducer';
import { getStatus } from './store/selectors';

export const App = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(getStatus);

  useEffect(() => {
    dispatch(fetchGasTransactions());
  }, []);

  return (
    <div className={style.container}>
      {status === 'loading' ? (
        <Preloader />
      ) : (
        <div className={style.chartBlock}>
          <CurrencyChart />
        </div>
      )}
    </div>
  );
};
