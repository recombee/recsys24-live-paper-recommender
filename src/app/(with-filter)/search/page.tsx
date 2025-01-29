'use client';

import { searchArticles } from '@/actions/recommendations/searchArticles';
import { ArticleList } from '@/components/ArticleList';
import { useArticleLoader } from '@/utils/useArticleLoader';
import { useSearchParams } from 'next/navigation';

export default function SearchResults() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query') ?? '';
	const { articles, loadMoreArticles, loading, hasMoreArticles } = useArticleLoader(
		searchArticles,
		searchQuery
	);

	return (
		<>
			<h2 className="font-bold">Search results for {`"${searchQuery}"`}</h2>
			<ArticleList
				articles={articles}
				loadMoreArticles={loadMoreArticles}
				loading={loading}
				hasMoreArticles={hasMoreArticles}
			/>
		</>
	);
}
