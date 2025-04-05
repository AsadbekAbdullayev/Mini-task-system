import { configureStore, combineReducers } from '@reduxjs/toolkit';
import generelReducer from '../slices/generelSlice';
import courseReducer from '../slices/courseSlice';

const reducers = combineReducers({
	generel: generelReducer,
	course: courseReducer,
});

export default configureStore({
	reducer: reducers,
});
export const store = configureStore({
	reducer: reducers,
});
export type RootState = ReturnType<typeof store.getState>;
