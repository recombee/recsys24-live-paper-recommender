'use client';

import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react';

const YearFilterContext = createContext<
	| {
			filteredYears: Set<number>;
			setFilteredYears: Dispatch<SetStateAction<Set<number>>>;
	  }
	| undefined
>(undefined);

export const useYearFilter = () => {
	const contextValue = useContext(YearFilterContext);
	if (!contextValue) {
		throw new Error('useYearFilter must be used within a YearFilterProvider');
	}
	return contextValue;
};

export const YearFilterProvider = ({ children }: PropsWithChildren) => {
	const [filteredYears, setFilteredYears] = useState(new Set([2024]));

	return (
		<YearFilterContext.Provider value={{ filteredYears, setFilteredYears }}>
			{children}
		</YearFilterContext.Provider>
	);
};
