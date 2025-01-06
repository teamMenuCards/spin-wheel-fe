import { apis } from '@/services';
import { combineSlices } from '@reduxjs/toolkit';

import { appStateSlice } from './app.slice';

export const rootReducer = combineSlices(appStateSlice, apis);
