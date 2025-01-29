'use server';

import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';
import { getUser } from '@/actions/user/getUser';
import { Article } from './getHomeArticles';
import { retryAsync } from '@/utils/retryAsync';

export async function getUserAlsoViewed(currentArticleId: string): Promise<Article[]> {
	const user = String(await getUser());

	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.RecommendItemsToUser(user, 3, {
					scenario: 'users-also-viewed',
					returnProperties: true,
					includedProperties: ['title', 'abstract', 'authors', 'year'],
					cascadeCreate: true,
					filter: `'itemId' != "${currentArticleId}"`,
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
