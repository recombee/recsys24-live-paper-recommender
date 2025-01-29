'use client';

import { getBookmarksIDSet } from '@/actions/listings/getBookmarksIDSet';
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { getUser } from '../actions/user/getUser';

const BookmarksContext = createContext<
	| {
			bookmarks: Set<string> | null;
			setBookmarks: Dispatch<SetStateAction<Set<string> | null>>;
	  }
	| undefined
>(undefined);

export const useBookmarks = () => {
	const contextValue = useContext(BookmarksContext);
	if (!contextValue) {
		throw new Error('useBookmarks must be used within a BookmarksProvider');
	}
	return contextValue;
};

export const loadBookmarks = async (setBookmarks: Dispatch<SetStateAction<Set<string> | null>>) => {
	const user = await getUser();
	if (!user) {
		return;
	}
	const storedBookmarks = await getBookmarksIDSet();
	setBookmarks(storedBookmarks);
};

export const BookmarksProvider = ({ children }: PropsWithChildren) => {
	const [bookmarks, setBookmarks] = useState<Set<string> | null>(null);

	useEffect(() => {
		loadBookmarks(setBookmarks);
	}, []);

	return (
		<BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
			{children}
		</BookmarksContext.Provider>
	);
};
