import { useEffect } from 'react';

import style from './App.module.scss';
import { CurrencyChart, Preloader } from './components';
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
        <div className={style.preloaderBlock}>
          <Preloader />
        </div>
      ) : (
        <div className={style.chartBlock}>
          <CurrencyChart />
        </div>
      )}
    </div>
  );
};
