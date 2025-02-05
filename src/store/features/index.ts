import { apis } from "@/services"
import { combineSlices } from "@reduxjs/toolkit"

import { appStateSlice as AppStateSlice } from "./app.slice"
import { DineInStateSlice } from "./dine-in.slice"

export const rootReducer = combineSlices(AppStateSlice, DineInStateSlice, apis)
