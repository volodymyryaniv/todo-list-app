import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createTodo } from '../../actions/todoListActions';
import { ToDoItemTypes } from '../../../types/index.js';
import { todoList } from '../../../assets/list.js';

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: todoList as ToDoItemTypes[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createTodo,
      (state, action: PayloadAction<ToDoItemTypes>) => {
        state.push(action.payload);
      }
    );
  },
});

export default todoListSlice.reducer;
