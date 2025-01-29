'use server';

import { createUser } from './createUser';
import { removeUser } from './removeUser';

export async function resetUser() {
	await removeUser();
	await createUser();
}
