import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ToDoItemTypes } from '../types';

const TransformCredentials = createTransform(
  (inboundState: ToDoItemTypes): string => {
    return JSON.stringify(inboundState);
  },
  (outboundState: string): ToDoItemTypes => {
    return JSON.parse(outboundState);
  }
);

export const todoListPersistConfig = {
  key: 'todoList',
  storage,
  whitelist: ['list'],
  transforms: [TransformCredentials],
};
