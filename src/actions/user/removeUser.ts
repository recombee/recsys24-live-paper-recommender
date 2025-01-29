'use server';

import { cookies } from 'next/headers';

export async function removeUser() {
	cookies().delete('user');
}
