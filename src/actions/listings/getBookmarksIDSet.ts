'use server';

import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { requests } from 'recombee-api-client';
import { getUser } from '@/actions/user/getUser';
import { retryAsync } from '@/utils/retryAsync';

export async function getBookmarksIDSet(): Promise<Set<string> | null> {
	const user = await getUser();
	if (!user) {
		return null;
	}
	try {
		const bookmarksResult = await retryAsync(
			() => ServerRecombeeClient.send(new requests.ListUserBookmarks(user)),
			{ retry: 5, delay: 500 }
		);
		return new Set(bookmarksResult.map((item) => item.itemId));
	} catch (e) {
		console.log(e);
		return new Set();
	}
}
