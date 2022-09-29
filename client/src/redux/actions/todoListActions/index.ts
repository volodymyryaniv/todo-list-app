import { createAction, nanoid } from '@reduxjs/toolkit';
import { ToDoItemTypes } from '../../../types/index.js';

export const createTodo = createAction(
  'createTodo',
  function prepare(
    taskText: ToDoItemTypes['taskText'],
    created?: ToDoItemTypes['created'],
    expireUntil?: ToDoItemTypes['expireUntil']
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

export const updateTodo = createAction(
  'updateTodo',
  function prepare(
    taskText: ToDoItemTypes['taskText'],
    created: ToDoItemTypes['created'],
    expireUntil: ToDoItemTypes['expireUntil'],
    id: ToDoItemTypes['id']
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
