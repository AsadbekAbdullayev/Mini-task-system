import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@redux/slices/generelSlice';
import { RootState } from '@redux/store/store';
import { useEffect } from 'react';




export const useThemeToggle = () => {
	const dispatch = useDispatch();
	const { theme } = useSelector((state: RootState) => state.generel);
	const toggle = () => {
		dispatch(toggleTheme());
	};

	useEffect(() => {
		const htmlElement = document.querySelector('html');
		if (theme === 'dark') {
			htmlElement?.classList.add('dark');
		} else {
			htmlElement?.classList.remove('dark');
		}
	}, [theme]);

	return { theme, toggle };
};
