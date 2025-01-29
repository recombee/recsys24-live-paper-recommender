'use client';

import { createUser } from '@/actions/user/createUser';
import { getUser } from '@/actions/user/getUser';
import { removeUser } from '@/actions/user/removeUser';
import { loadBookmarks, useBookmarks } from '@/utils/BookmarksContext';
import { useEffect, useState } from 'react';

const COOKIE_LOCAL_STORAGE_KEY = 'cookie-consent';

export const CookieConsentBanner = () => {
	const [isBannerVisible, setIsBannerVisible] = useState(false);
	const { setBookmarks } = useBookmarks();

	useEffect(() => {
		const hasConsent = localStorage.getItem(COOKIE_LOCAL_STORAGE_KEY);

		(async function () {
			const user = await getUser();
			switch (hasConsent) {
				case 'true':
					if (!user) {
						await createUser();
						loadBookmarks(setBookmarks);
					}
					break;
				case 'false':
					if (user) {
						await removeUser();
					}
					break;
				default:
					if (user) {
						await removeUser();
					}
					setIsBannerVisible(true);
					break;
			}
		})();
	}, [setBookmarks]);

	if (!isBannerVisible) {
		return null;
	}

	const handleAllow = async () => {
		await createUser();
		loadBookmarks(setBookmarks);
		localStorage.setItem(COOKIE_LOCAL_STORAGE_KEY, 'true');
		setIsBannerVisible(false);
	};

	const handleDecline = () => {
		localStorage.setItem(COOKIE_LOCAL_STORAGE_KEY, 'false');
		setIsBannerVisible(false);
	};

	return (
		<div className="fixed bottom-0 bg-primary left-0 right-0 py-4 px-8 flex flex-col justify-center gap-4 md:gap-8 items-center border-t-2 border-primary sm:flex-row">
			<p className="text-sm text-center sm:text-left text-white">
				We use cookies and local storage to enhance your experience and collect data for research
				purposes.
			</p>
			<div className="flex gap-4 text-sm font-semibold">
				<button
					className="bg-primary border-2 border-white text-white px-4 py-2 rounded-lg"
					onClick={handleDecline}
				>
					Decline
				</button>
				<button
					className="bg-white border-2 border-white text-primary px-4 py-2 rounded-lg"
					onClick={handleAllow}
				>
					Accept
				</button>
			</div>
		</div>
	);
};
