'use server';

import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';
import { Article } from '../recommendations/getHomeArticles';
import { getUser } from '@/actions/user/getUser';
import { retryAsync } from '@/utils/retryAsync';

export async function getBookmarks(userBookmarks: Set<string>): Promise<Article[]> {
	const user = await getUser();
	if (!user) {
		return [];
	}

	const bookmarkIds = Array.from(userBookmarks)
		.map((item) => `"${item}"`)
		.join(', ');

	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.ListItems({
					returnProperties: true,
					includedProperties: ['title', 'abstract', 'authors', 'year'],
					filter: `'itemId' in {${bookmarkIds}}`,
				})
			),
		{ retry: 5, delay: 500 }
	);

	return result.map((item) => {
		const { itemId, ...rest } = item;
		return { id: itemId, ...rest };
	}) as Article[];
}
