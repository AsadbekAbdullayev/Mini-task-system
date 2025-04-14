import { createContext, useContext, useState, ReactNode } from 'react';

type FontSize = 'small' | 'normal' | 'large';
interface FontContextType {
	fontSize: FontSize;
	setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontContextType | undefined>(undefined);

export const useFontSize = () => {
	const context = useContext(FontSizeContext);
	if (!context) {
		throw new Error('useFontSize must be used within a FontSizeProvider');
	}
	return context;
};

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
	const [fontSize, setFontSize] = useState<FontSize>('normal');

	return (
		<FontSizeContext.Provider value={{ fontSize, setFontSize }}>
			{children}
		</FontSizeContext.Provider>
	);
};
