import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createTodo } from '../../actions/todoListActions';
import { ToDoItemTypes } from '../../../types/index.js';
import { todoList } from '../../../assets/list.js';

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: todoList as ToDoItemTypes[],
  reducers: {
    setTodoStatus(state, action: PayloadAction<string>) {
      state.map((item: ToDoItemTypes): ToDoItemTypes => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createTodo,
      (state, action: PayloadAction<ToDoItemTypes>) => {
        state.push(action.payload);
      }
    );
  },
});

export const { setTodoStatus } = todoListSlice.actions;
export default todoListSlice.reducer;
