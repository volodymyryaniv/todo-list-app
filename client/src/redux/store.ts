import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoListReducer from './slices/todoListSlice';
import scrollSliceReducer from './slices/scrollSlice';
import popupSlice from './slices/popupSlice';
import { todoListPersistConfig } from './persistConfig';
import { TodoStateTypes } from './slices/todoListSlice';

const rootReducer = combineReducers({
  todoListReducer: persistReducer<TodoStateTypes>(
    todoListPersistConfig,
    todoListReducer
  ),
  popupSlice,
  scrollSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
