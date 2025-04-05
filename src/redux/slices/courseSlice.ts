import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CourseDetails {
	id: number;
	chapters: any[];
	chaptersCount: number;
	description: string;
	instructorName: string;
	instructorPhoto : string;
	learningObjectives: string[];
	rate: number;
	name: string;
}

interface InitialState {
	courseDetail: CourseDetails;
	refetchLessonsCounter: number;
	refetchChaptersCounter: number;
}
const initialState: InitialState = {
	courseDetail: {
		id: 0,
		chapters: [],
		chaptersCount: 0,
		description: '',
		instructorName: '',
		instructorPhoto: '',
		rate: 0,
		learningObjectives: [],
		name: '',
	},
	refetchLessonsCounter: 0,
	refetchChaptersCounter: 0,
};

const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		changeState: (
			state,
			action: PayloadAction<{ name: keyof InitialState; value: any }>,
		) => {
			state[action.payload.name] = action.payload.value;
		},
		setCourseDetail: (state, action: PayloadAction<CourseDetails>) => {
			state.courseDetail = action.payload;
		},
		triggerRefetchLessons: (state) => {
			state.refetchLessonsCounter += 1;
		},
		triggerRefetchChapters: (state) => {
			state.refetchChaptersCounter += 1;
		},
	},
});

export const { setCourseDetail, changeState, triggerRefetchLessons, triggerRefetchChapters } = courseSlice.actions;
export default courseSlice.reducer;
