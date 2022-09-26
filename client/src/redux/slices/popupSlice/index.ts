import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PopupStateTypes {
  open: boolean;
}

const popupSlice = createSlice({
  name: 'todoList',
  initialState: { open: false } as PopupStateTypes,
  reducers: {
    setPopup: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
      return state;
    },
  },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;
