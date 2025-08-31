import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetails {
	id?: string | null;
	name: string | null;
	email: string | null;
	photoURL?: string | null;
	createdAt?: Date | null;
}

interface GeneralState {
	userDetails: UserDetails;
}

const initialState: GeneralState = {
	userDetails: {
		id: null,
		name: null,
		email: null,
		photoURL: null,
		createdAt: null,
	},
};

const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		changeState: (
			state,
			action: PayloadAction<{ name: keyof GeneralState; value: any }>,
		) => {
			(state[action.payload.name] as any) = action.payload.value;
		},
		setUserDetails: (state, action: PayloadAction<UserDetails>) => {
			state.userDetails = action.payload;
		},
	},
});

export const { changeState, setUserDetails } = generalSlice.actions;
export default generalSlice.reducer;
