import { createAction, nanoid } from '@reduxjs/toolkit';
import { TaskCardTypes } from '../../../types/index.js';

export const createTask = createAction(
  'createTask',
  function prepare(
    taskText: TaskCardTypes['taskText'],
    created?: TaskCardTypes['created'],
    expireUntil?: TaskCardTypes['expireUntil']
  ) {
    const date = new Date();
    const dateDefault = created
      ? new Date(created).toString()
      : date.toString();
    const expiredDefault = expireUntil
      ? new Date(expireUntil).toString()
      : new Date(date.setDate(date.getDate() + 1)).toString();
    return {
      payload: {
        taskText,
        id: nanoid(),
        created: dateDefault,
        expireUntil: expiredDefault,
        completed: false,
      },
    };
  }
);

export const updateTask = createAction(
  'updateTask',
  function prepare(
    taskText: TaskCardTypes['taskText'],
    created: TaskCardTypes['created'],
    expireUntil: TaskCardTypes['expireUntil'],
    id: TaskCardTypes['id']
  ) {
    return {
      payload: {
        taskText,
        id,
        created,
        expireUntil,
        completed: false,
      },
    };
  }
);
