'use server';

import { getUser } from '@/actions/user/getUser';
import { retryAsync } from '@/utils/retryAsync';
import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';

export type Article = {
	id: string;
	title: string;
	abstract: string;
	authors: string[];
	year: number;
	recommId?: string;
};

export type ArticlesWithRecommID = { recommId: string; articles: Article[] };

export async function getHomeArticles(filteredYears: Set<number>): Promise<ArticlesWithRecommID> {
	const user = String(await getUser());

	const yearFilter =
		filteredYears.size > 0 ? `'year' in {${[...filteredYears].join(',')}}` : undefined;

	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.RecommendItemsToUser(user, 20, {
					scenario: 'homepage',
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
