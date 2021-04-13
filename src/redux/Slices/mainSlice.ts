import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


interface State {
  blocks: {id: string, name: string}[],
  categories: {id: string, name: string}[],
  views: {id: string, time: string}[],
}

const initialState = {
  blocks: [],
  categories: [],
  views: []
} as State


export const mainSLice = createSlice({
  name: 'mainData',
  initialState,
  reducers: {
    initData: (state, action) => {
      state.blocks = action.payload.blocks.map((blockName: string, index: string) => ({
        id: index,
        name: blockName
      }));

      state.categories = action.payload.categories.map((categoryName: string, index: string) => ({
        id: index,
        name: categoryName
      }));;
      state.views = action.payload.views;
    },
  },
})

export const getMainData = (state: RootState) => state.mainData;

// Action creators are generated for each case reducer function
export const { initData } = mainSLice.actions

export default mainSLice.reducer
