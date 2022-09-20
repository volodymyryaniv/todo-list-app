import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoListReducer from './todoListSlice';

const rootReducer = combineReducers({ todoListReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
