import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createTask, updateTask } from '@actions/taskListActions';
import { SortTypes, TaskCardTypes } from '../../../types/index.js';
import { categories } from 'config/sortByList';

export interface TaskListType {
  list: TaskCardTypes[];
}

export interface TaskStateTypes extends TaskListType {
  activeItem: TaskCardTypes | null;
  sortBy: SortTypes;
}

const taskListSlice = createSlice({
  name: 'taskListReducer',
  initialState: {
    list: [],
    activeItem: null,
    sortBy: categories[0],
  } as TaskStateTypes,
  reducers: {
    setTaskStatus(state, action: PayloadAction<string>) {
      state.list.map((item: TaskCardTypes): TaskCardTypes => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    removeTask(state, action: PayloadAction<string>) {
      return {
        ...state,
        list: state.list.filter((item: TaskCardTypes): boolean => {
          return current(item).id !== action.payload;
        }),
      };
    },
    setActiveTask(state, action: PayloadAction<string>) {
      const item = state.list.filter((item: TaskCardTypes): boolean => {
        return current(item).id === action.payload;
      });
      return {
        ...state,
        activeItem: item[0],
      };
    },
    removeActiveTask: (state) => {
      return {
        ...state,
        activeItem: null,
      };
    },
    clearCompletedTasks: (state) => {
      return {
        ...state,
        list: state.list.filter((item: TaskCardTypes): boolean => {
          return !item.completed;
        }),
      };
    },
    setSortBy(state, action: PayloadAction<SortTypes>) {
      return {
        ...state,
        sortBy: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createTask,
      (state, action: PayloadAction<TaskCardTypes>) => {
        state.list.push(action.payload);
      }
    );
    builder.addCase(updateTask, (state, action): TaskStateTypes => {
      const updatedList = state.list.map((item: TaskCardTypes) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedList,
      };
    });
  },
});

export const {
  setTaskStatus,
  removeTask,
  setActiveTask,
  removeActiveTask,
  clearCompletedTasks,
  setSortBy,
} = taskListSlice.actions;
export default taskListSlice.reducer;
