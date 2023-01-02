import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { calendarSlice } from './calendar'
import { uiSlice } from './ui'
export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})