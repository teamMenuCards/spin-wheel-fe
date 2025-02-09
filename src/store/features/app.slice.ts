import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum CLIENT_APP_MODE {
	DINE_IN = "DINE_IN",
	DELIVERY = "DELIVERY"
}

export type AppState = {
	isLoggedIn: boolean
	mode: CLIENT_APP_MODE
}

const initialState: Readonly<AppState> = {
	isLoggedIn: false,
	mode: CLIENT_APP_MODE.DELIVERY // mode is DELIVERY by default
}

export const appStateSlice = createSlice({
	name: "appState",
	initialState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload
		},

		setMode: (state, action: PayloadAction<CLIENT_APP_MODE>) => {
			state.mode = action.payload
		}
	}
})

export const { setIsLoggedIn, setMode } = appStateSlice.actions
export type AppStateReducer = ReturnType<typeof appStateSlice.reducer>
export default appStateSlice.reducer
