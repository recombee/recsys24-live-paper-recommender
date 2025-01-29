'use server';

import { ServerRecombeeClient } from '@/utils/serverRecombeeClient';
import { cookies } from 'next/headers';
import { requests } from 'recombee-api-client';

export const createUser = async () => {
	const user = cookies().get('user')?.value;
	if (!user) {
		const newUserId = crypto.randomUUID();
		cookies().set('user', newUserId, {
			maxAge: 60 * 60 * 24 * 365,
		});
		await ServerRecombeeClient.send(new requests.AddUser(newUserId));
	}
};
