import { configureStore, combineReducers } from '@reduxjs/toolkit';
import generelReducer from '../slices/generelSlice';

const reducers = combineReducers({
	generel: generelReducer,
});

export default configureStore({
	reducer: reducers,
});
export const store = configureStore({
	reducer: reducers,
});
export type RootState = ReturnType<typeof store.getState>;
