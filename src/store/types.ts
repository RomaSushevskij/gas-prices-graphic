import { rootReducer, store } from './store';

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
