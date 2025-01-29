'use client';

import { getArticleDetail } from '@/actions/listings/getArticleDetail';
import { Article } from '@/actions/recommendations/getHomeArticles';
import { getSimilarArticles } from '@/actions/recommendations/getSimilarArticles';
import { addArticleView } from '@/actions/interactions/addArticleView';
import { ArticleBlock } from '@/components/ArticleBlock';
import { AuthorNames } from '@/components/AuthorNames';
import { useEffect, useState } from 'react';
import { BookmarkButton } from '@/components/BookmarkButton';
import { Loading } from '@/components/Loading';
import { getUserAlsoViewed } from '@/actions/recommendations/getUserAlsoViewed';
import { ArticleSource, FulltextButton } from '@/components/FulltextButton';
import { useSearchParams } from 'next/navigation';
import { ArticleAbstract } from '@/components/ArticleAbstract';

export default function ArticleDetail({ params }: { params: { id: string } }) {
	const articleId = params.id;
	const searchParams = useSearchParams();
	const sourceRecommId = searchParams.get('recommId') ?? '';

	const [article, setArticle] = useState<Article | null>(null);
	const [articleLoading, setArticleLoading] = useState(true);
	const [similarArticles, setSimilarArticles] = useState<Article[]>([]);
	const [similarLoading, setSimilarLoading] = useState(true);
	const [alsoViewed, setAlsoViewed] = useState<Article[]>([]);
	const [alsoViewedLoading, setAlsoViewedLoading] = useState(true);

	useEffect(() => {
		(async function () {
			setArticleLoading(true);
			const article = await getArticleDetail(articleId);
			setArticle(article);
			setArticleLoading(false);
		})();
	}, [articleId]);

	useEffect(() => {
		if (!articleLoading && article) {
			addArticleView(articleId, sourceRecommId);

			(async function () {
				setSimilarLoading(true);
				const articles = await getSimilarArticles(articleId);
				setSimilarArticles(articles);
				setSimilarLoading(false);
			})();

			(async function () {
				setAlsoViewedLoading(true);
				const articles = await getUserAlsoViewed(articleId);
				setAlsoViewed(articles);
				setAlsoViewedLoading(false);
			})();
		}
	}, [articleLoading, article, articleId, sourceRecommId]);

	if (!articleLoading && !article) {
		return <p>Article not found.</p>;
	}

	return (
		<>
			{articleLoading || !article ? (
				<Loading />
			) : (
				<>
					<div className="flex justify-between items-start gap-2">
						<h1 className="text-lg font-semibold mb-2">{article.title}</h1>
						<BookmarkButton articleId={article.id} />
					</div>
					<p className="text-gray-600 text-sm mb-4">
						{article.year}
						{' · '}
						<AuthorNames authors={article.authors} />
					</p>
					<div className="flex items-center gap-4 mb-4">
						<FulltextButton articleTitle={article.title} source={ArticleSource.ACM} />
						<FulltextButton articleTitle={article.title} source={ArticleSource.GOOGLE_SCHOLAR} />
					</div>
					<ArticleAbstract abstract={article.abstract} />
				</>
			)}

			<h2 className="font-semibold mt-10">Similar articles</h2>
			{similarLoading ? (
				<Loading />
			) : (
				similarArticles.map((article) => <ArticleBlock key={article.id} article={article} />)
			)}

			<h2 className="font-semibold mt-10">Users also viewed</h2>
			{alsoViewedLoading ? (
				<Loading />
			) : (
				alsoViewed.map((article) => <ArticleBlock key={article.id} article={article} />)
			)}
		</>
	);
}
