import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { eventSlice } from "./reducers/event";

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        event:eventSlice.reducer
    }, 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
