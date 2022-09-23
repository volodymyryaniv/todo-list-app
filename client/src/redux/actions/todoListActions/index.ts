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

    console.log('createTodo saving format', new Date().toString()); //for testing
    console.log('createTodo created', new Date().toString()); //for testing
    console.log('createTodo expireUntil', new Date().toString());
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

export const updateTodo = createAction(
  'updateTodo',
  function prepare(
    text: ToDoItemTypes['text'],
    created: ToDoItemTypes['created'],
    expireUntil: ToDoItemTypes['expireUntil'],
    id: ToDoItemTypes['id']
  ) {
    return {
      payload: {
        text,
        id,
        created,
        expireUntil,
        completed: false,
      },
    };
  }
);
