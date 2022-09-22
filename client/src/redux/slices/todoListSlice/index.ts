import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createTodo } from '../../actions/todoListActions';
import { ToDoItemTypes } from '../../../types/index.js';
import { todoList } from '../../../assets/list.js';

const todoListSlice = createSlice({
  name: 'todoListReducer',
  initialState: { list: todoList as ToDoItemTypes[] },
  reducers: {
    setTodoStatus(state, action: PayloadAction<string>) {
      state.list.map((item: ToDoItemTypes): ToDoItemTypes => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    removeTodo(state, action: PayloadAction<string>) {
      return {
        ...state,
        list: state.list.filter((item: ToDoItemTypes): boolean => {
          return current(item).id !== action.payload;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createTodo,
      (state, action: PayloadAction<ToDoItemTypes>) => {
        state.list.push(action.payload);
      }
    );
  },
});

export const { setTodoStatus, removeTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
