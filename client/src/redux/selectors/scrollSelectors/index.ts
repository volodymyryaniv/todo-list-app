import { ScrollStateTypes } from '@slices/scrollSlice';
import { RootState } from '@redux/store';

export const selectAllScrolls = (state: RootState): ScrollStateTypes =>
  state.scrollSliceReducer;

export const selectScrollBottom = (state: RootState): boolean | undefined =>
  state.scrollSliceReducer.scrollBottom;

export const selectScrollTop = (state: RootState): boolean | undefined =>
  state.scrollSliceReducer.scrollTop;

export const selectScrollToElem = (state: RootState): boolean | undefined =>
  state.scrollSliceReducer.scrollToElem;
