'use client';

import { resetUser } from '@/actions/user/resetUser';

export const ResetUserButton = () => {
	return (
		<button
			onClick={async () => {
				await resetUser();
				window.location.href = '/';
			}}
			className="text-xs"
		>
			Reset user
		</button>
	);
};
