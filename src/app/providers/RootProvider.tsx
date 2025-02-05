"use client"

import { ReactNode } from "react"
import StoreProvider from "./StoreProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => (
	<StoreProvider>{children}</StoreProvider>
)
