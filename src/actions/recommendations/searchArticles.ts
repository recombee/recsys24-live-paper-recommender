'use server';

import { getUser } from '@/actions/user/getUser';
import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';
import { Article, ArticlesWithRecommID } from './getHomeArticles';
import { retryAsync } from '@/utils/retryAsync';

export async function searchArticles(
	filteredYears: Set<number>,
	searchQuery?: string
): Promise<ArticlesWithRecommID> {
	if (!searchQuery) {
		return { recommId: '', articles: [] };
	}
	const user = String(await getUser());

	const yearFilter =
		filteredYears.size > 0 ? `'year' in {${[...filteredYears].join(',')}}` : undefined;

	try {
		const result = await retryAsync(
			() =>
				ServerRecombeeClient.send(
					new requests.SearchItems(user, searchQuery, 20, {
						scenario: 'search',
						returnProperties: true,
						includedProperties: ['title', 'abstract', 'authors', 'year'],
						cascadeCreate: true,
						filter: yearFilter,
					})
				),
			{ retry: 1, delay: 500 }
		);

		return {
			recommId: result.recommId,
			articles: result.recomms.map(({ id, values }) => ({
				id,
				recommId: result.recommId,
				...values,
			})) as Article[],
		};
	} catch (err) {
		console.error(err);
		return { recommId: '', articles: [] };
	}
}
