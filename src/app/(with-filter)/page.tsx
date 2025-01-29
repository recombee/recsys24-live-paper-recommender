'use client';

import { getHomeArticles } from '@/actions/recommendations/getHomeArticles';
import { ArticleList } from '@/components/ArticleList';
import { useArticleLoader } from '@/utils/useArticleLoader';

export default function Home() {
	const { articles, loadMoreArticles, loading, hasMoreArticles } =
		useArticleLoader(getHomeArticles);

	return (
		<>
			<h2 className="font-bold">Articles</h2>
			<ArticleList
				articles={articles}
				loadMoreArticles={loadMoreArticles}
				loading={loading}
				hasMoreArticles={hasMoreArticles}
			/>
		</>
	);
}
