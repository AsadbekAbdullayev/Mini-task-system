// context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Interface for the context value
interface ThemeContextType {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
	fontSize: 'small' | 'normal' | 'large';
	setFontSize: (size: 'small' | 'normal' | 'large') => void;
}

// Create a context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component to wrap your app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>(
		'normal',
	);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider
			value={{ theme, toggleTheme, fontSize, setFontSize }}
		>
			<div className={theme}>{children}</div>
		</ThemeContext.Provider>
	);
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
