import { useState, useCallback, useRef, useEffect } from 'react';
import { Article, ArticlesWithRecommID } from '@/actions/recommendations/getHomeArticles';
import { getNextArticles } from '@/actions/recommendations/getNextArticles';
import { useYearFilter } from '@/utils/YearFilterContext';

export const useArticleLoader = (
	loadArticles: (filteredYears: Set<number>, searchQuery?: string) => Promise<ArticlesWithRecommID>,
	searchQuery?: string
) => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const { filteredYears } = useYearFilter();
	const recommIdRef = useRef('');
	const hasMoreArticles = useRef(true);

	const loadMoreArticles = useCallback(async () => {
		if (!recommIdRef.current || loading || !hasMoreArticles.current) return;
		setLoading(true);
		const newArticles = await getNextArticles(recommIdRef.current);
		if (newArticles.length === 0) {
			hasMoreArticles.current = false;
		} else {
			setArticles((prevArticles) => [...prevArticles, ...newArticles]);
		}
		setLoading(false);
	}, [loading]);

	useEffect(() => {
		const loadInitialArticles = async () => {
			setLoading(true);
			hasMoreArticles.current = true;
			const { recommId, articles: initialArticles } = searchQuery
				? await loadArticles(filteredYears, searchQuery)
				: await loadArticles(filteredYears);

			setArticles(initialArticles);
			recommIdRef.current = recommId;
			setLoading(false);
		};

		loadInitialArticles();
	}, [filteredYears, searchQuery, loadArticles]);

	return { articles, loadMoreArticles, loading, hasMoreArticles };
};
