'use server';

import { getUser } from '@/actions/user/getUser';
import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';
import { Article, ArticlesWithRecommID } from './getHomeArticles';
import { retryAsync } from '@/utils/retryAsync';

export async function getPopularArticles(
	filteredYears: Set<number>
): Promise<ArticlesWithRecommID> {
	const user = String(await getUser());

	const yearFilter =
		filteredYears.size > 0 ? `'year' in {${[...filteredYears].join(',')}}` : undefined;

	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.RecommendItemsToUser(user, 20, {
					scenario: 'popular',
					returnProperties: true,
					includedProperties: ['title', 'abstract', 'authors', 'year'],
					cascadeCreate: true,
					filter: yearFilter,
				})
			),
		{ retry: 5, delay: 500 }
	);

	return {
		recommId: result.recommId,
		articles: result.recomms.map(({ id, values }) => ({
			id,
			recommId: result.recommId,
			...values,
		})) as Article[],
	};
}
