import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TaskCardTypes } from '../types';

const TransformCredentials = createTransform(
  (inboundState: TaskCardTypes): string => {
    return JSON.stringify(inboundState);
  },
  (outboundState: string): TaskCardTypes => {
    return JSON.parse(outboundState);
  }
);

export const taskListPersistConfig = {
  key: 'taskList',
  storage,
  whitelist: ['list'],
  transforms: [TransformCredentials],
};
