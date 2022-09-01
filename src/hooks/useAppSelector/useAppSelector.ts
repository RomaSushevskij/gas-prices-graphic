import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppStateType } from '../index';

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
