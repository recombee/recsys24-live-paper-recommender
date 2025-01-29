'use client';

import { addBookmark } from '@/actions/interactions/addBookmark';
import { removeBookmark } from '@/actions/interactions/removeBookmark';
import { useBookmarks } from '@/utils/BookmarksContext';

export const BookmarkButton = ({
	articleId,
	recommId = '',
}: {
	articleId: string;
	recommId?: string;
}) => {
	const { bookmarks, setBookmarks } = useBookmarks();
	if (!bookmarks) {
		return null;
	}
	const bookmarked = bookmarks.has(articleId);

	const handleBookmark = () => {
		const newBookmarks = new Set(bookmarks);
		if (bookmarked) {
			newBookmarks.delete(articleId);
			removeBookmark(articleId);
		} else {
			newBookmarks.add(articleId);
			addBookmark(articleId, recommId);
		}
		setBookmarks(newBookmarks);
	};

	return (
		<button onClick={handleBookmark}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`h-6 w-6 ${bookmarked && 'text-primary'}`}
				viewBox="0 0 24 24"
				fill={bookmarked ? 'currentColor' : 'none'}
				stroke="currentColor"
			>
				<path
					d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};
