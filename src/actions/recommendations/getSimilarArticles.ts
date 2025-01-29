'use server';

import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';
import { Article } from './getHomeArticles';
import { retryAsync } from '@/utils/retryAsync';

export async function getSimilarArticles(articleId: string): Promise<Article[]> {
	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.RecommendItemsToItem(articleId, 'null', 3, {
					scenario: 'similar-articles',
					returnProperties: true,
					includedProperties: ['title', 'abstract', 'authors', 'year'],
				})
			),
		{ retry: 5, delay: 500 }
	);

	return result.recomms.map(({ id, values }) => ({
		id,
		recommId: result.recommId,
		...values,
	})) as Article[];
}
