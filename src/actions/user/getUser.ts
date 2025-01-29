'use server';

import { cookies } from 'next/headers';

export const getUser = async () => {
	return cookies().get('user')?.value ?? null;
};
