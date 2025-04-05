import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Theme = 'light' | 'dark';
interface UserDetails {
	id: number | null;
	firstName: string | null;
	lastName: string | null;
	username: string | null;
	email: string | null;
	profilePhoto: string | null;
}

interface Breadcrumb {
	title: string;
	href?: string;
}

interface GeneralState {
	data: Record<string, any>;
	theme: Theme;
	userDetails: UserDetails;
	navbarTitle: string;
	breadcrumb: Breadcrumb[];
	totalCount: number | null;
}

const initialState: GeneralState = {
	data: {},
	userDetails: {
		id: null,
		firstName: null,
		lastName: null,
		username: null,
		email: null,
		profilePhoto: null,
	},
	theme: (localStorage.getItem('theme') as Theme) || 'light',
	navbarTitle: '',
	breadcrumb: [],
	totalCount: 0,
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
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', state.theme);
		},
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
			localStorage.setItem('theme', state.theme);
		},
		setUserDetails: (state, action: PayloadAction<UserDetails>) => {
			state.userDetails = action.payload;
		},
		clearBreadcrumb: (state) => {
			state.breadcrumb = [];
		},
	},
});

export const { changeState, toggleTheme, setTheme, setUserDetails, clearBreadcrumb } =
	generalSlice.actions;
export default generalSlice.reducer;
