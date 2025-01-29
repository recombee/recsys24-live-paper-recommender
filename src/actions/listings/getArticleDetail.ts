'use server';

import { requests } from 'recombee-api-client';
import { Article } from '@/actions/recommendations/getHomeArticles';
import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { retryAsync } from '@/utils/retryAsync';

export async function getArticleDetail(articleId: string): Promise<Article | null> {
	const result = await retryAsync(
		() =>
			ServerRecombeeClient.send(
				new requests.ListItems({
					returnProperties: true,
					includedProperties: ['title', 'abstract', 'authors', 'year'],
					filter: `'itemId' == "${articleId}"`,
				})
			),
		{ retry: 5, delay: 500 }
	);

	if (result.length !== 1 || ('title' in result[0] && result[0].title == null)) {
		return null;
	}

	const { itemId, ...rest } = result[0];
	return { id: itemId, ...rest } as Article;
}
