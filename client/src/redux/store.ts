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
import taskListReducer from './slices/taskListSlice';
import scrollSliceReducer from './slices/scrollSlice';
import popupSlice from './slices/popupSlice';
import { taskListPersistConfig } from './persistConfig';
import { TaskStateTypes } from './slices/taskListSlice';

const rootReducer = combineReducers({
  taskListReducer: persistReducer<TaskStateTypes>(
    taskListPersistConfig,
    taskListReducer
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
