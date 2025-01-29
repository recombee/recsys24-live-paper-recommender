import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { ResetUserButton } from '@/components/ResetUserButton';
import { YearFilterProvider } from '@/utils/YearFilterContext';
import { Suspense } from 'react';
import { Roboto } from 'next/font/google';
import { BookmarksProvider } from '@/utils/BookmarksContext';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';

export const metadata: Metadata = {
	title: 'Explore Papers',
	description: "Explore RecSys'24 articles!",
};

const roboto = Roboto({
	subsets: ['latin', 'latin-ext'],
	display: 'swap',
	weight: ['400', '500', '700'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={roboto.className}>
			<body>
				<Suspense>
					<YearFilterProvider>
						<BookmarksProvider>
							<Header />
							<div className="container mx-auto py-4 px-8">{children}</div>
							<footer className="container mx-auto py-4 px-8 flex justify-end">
								<ResetUserButton />
							</footer>
							<CookieConsentBanner />
						</BookmarksProvider>
					</YearFilterProvider>
				</Suspense>
			</body>
		</html>
	);
}
