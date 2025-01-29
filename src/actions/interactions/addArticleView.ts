'use server';

import { getUser } from '@/actions/user/getUser';
import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';

export async function addArticleView(articleId: string, recommId: string) {
	const user = await getUser();
	if (!user) {
		return;
	}

	ServerRecombeeClient.send(
		new requests.AddDetailView(user, articleId, {
			recommId: recommId,
		})
	);
}
