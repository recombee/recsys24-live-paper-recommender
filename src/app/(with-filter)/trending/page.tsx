'use client';

import { getPopularArticles } from '@/actions/recommendations/getPopularArticles';
import { ArticleList } from '@/components/ArticleList';
import { useArticleLoader } from '@/utils/useArticleLoader';

export default function Home() {
	const { articles, loadMoreArticles, loading, hasMoreArticles } =
		useArticleLoader(getPopularArticles);

	return (
		<>
			<h2 className="font-bold">Trending Articles</h2>
			<ArticleList
				articles={articles}
				loadMoreArticles={loadMoreArticles}
				loading={loading}
				hasMoreArticles={hasMoreArticles}
			/>
		</>
	);
}
