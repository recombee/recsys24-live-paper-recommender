'use client';

import { Article } from '@/actions/recommendations/getHomeArticles';
import { MutableRefObject, useCallback } from 'react';
import { ArticleBlock } from './ArticleBlock';
import { Loading } from './Loading';

export const ArticleList = ({
	articles,
	loadMoreArticles,
	loading,
	hasMoreArticles,
}: {
	articles: Article[];
	loadMoreArticles: () => Promise<void>;
	loading: boolean;
	hasMoreArticles: MutableRefObject<boolean>;
}) => {
	const lastArticleRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (node) {
				const observer = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && hasMoreArticles.current) {
						loadMoreArticles();
					}
				});
				observer.observe(node);
				return () => observer.disconnect();
			}
		},
		[loadMoreArticles, hasMoreArticles]
	);

	return (
		<>
			{articles.map((article, index) => (
				<div key={article.id} ref={index === articles.length - 1 ? lastArticleRef : null}>
					<ArticleBlock article={article} />
				</div>
			))}
			{loading && <Loading />}
		</>
	);
};
