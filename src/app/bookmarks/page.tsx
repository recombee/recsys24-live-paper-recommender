'use client';

import { getBookmarks } from '@/actions/listings/getBookmarks';
import { Article } from '@/actions/recommendations/getHomeArticles';
import { ArticleBlock } from '@/components/ArticleBlock';
import { Loading } from '@/components/Loading';
import { useBookmarks } from '@/utils/BookmarksContext';
import { useEffect, useState } from 'react';

export default function Bookmarks() {
	const [bookmarksArticles, setBookmarksArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const { bookmarks } = useBookmarks();

	useEffect(() => {
		(async function () {
			setLoading(true);
			if (bookmarks) {
				const bookmarksArticles = await getBookmarks(bookmarks);
				setBookmarksArticles(bookmarksArticles);
			}
			setLoading(false);
		})();
	}, [bookmarks]);

	return (
		<>
			<h2 className="font-bold">Bookmarks</h2>
			{loading ? (
				<Loading />
			) : (
				bookmarksArticles.map((article) => <ArticleBlock key={article.id} article={article} />)
			)}
		</>
	);
}
