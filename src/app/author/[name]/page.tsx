'use client';

import { getAuthorArticles } from '@/actions/listings/getAuthorArticles';
import { Article } from '@/actions/recommendations/getHomeArticles';
import { ArticleBlock } from '@/components/ArticleBlock';
import { Loading } from '@/components/Loading';
import { useState, useEffect } from 'react';

export default function AuthorArticles({ params }: { params: { name: string } }) {
	const authorName = decodeURIComponent(params.name);

	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async function () {
			setLoading(true);
			const articles = await getAuthorArticles(authorName);
			setArticles(articles);
			setLoading(false);
		})();
	}, [authorName]);

	return (
		<>
			<h1 className="text-lg font-semibold mb-2">Articles by {authorName}</h1>
			{loading ? (
				<Loading />
			) : articles.length > 0 ? (
				articles.map((article) => <ArticleBlock key={article.id} article={article} />)
			) : (
				<p>No articles found for this author.</p>
			)}
		</>
	);
}
