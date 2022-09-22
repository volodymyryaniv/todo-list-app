import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoListReducer from './slices/todoListSlice';
import popupSlice from './slices/popupSlice';

const rootReducer = combineReducers({ todoListReducer, popupSlice });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
