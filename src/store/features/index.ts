import { apis } from '@/services';
import { combineSlices } from '@reduxjs/toolkit';

import { AppStateSlice } from './app.slice';
import { DineInStateSlice } from './dine-in.slice';

export const rootReducer = combineSlices(AppStateSlice, DineInStateSlice, apis);
