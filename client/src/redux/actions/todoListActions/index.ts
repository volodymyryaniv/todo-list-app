import { createAction, nanoid } from '@reduxjs/toolkit';
import { ToDoItemTypes } from '../../../types/index.js';

export const createTodo = createAction(
  'createTodo',
  function prepare(
    text: ToDoItemTypes['text'],
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
        text,
        id: nanoid(),
        created: dateDefault,
        expireUntil: expiredDefault,
        completed: false,
      },
    };
  }
);
