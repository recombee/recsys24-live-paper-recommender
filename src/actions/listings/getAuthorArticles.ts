'use server';

import { requests } from 'recombee-api-client';
import { Article } from '@/actions/recommendations/getHomeArticles';
import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { retryAsync } from '@/utils/retryAsync';

export async function getAuthorArticles(authorName: string): Promise<Article[]> {
	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.ListItems({
					returnProperties: true,
					includedProperties: ['title', 'abstract', 'authors', 'year'],
					filter: `"${authorName}" in 'authors'`,
				})
			),
		{ retry: 5, delay: 500 }
	);

	return result.map((item) => {
		const { itemId, ...rest } = item;
		return { id: itemId, ...rest };
	}) as Article[];
}
