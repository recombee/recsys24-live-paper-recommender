'use client';

import { useDebounce } from '@/utils/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { forwardRef, useEffect, useRef, useState } from 'react';

export const SearchInput = forwardRef<HTMLInputElement>(function SearchInput(props, ref) {
	const router = useRouter();
	const currentPathname = usePathname();
	const searchParams = useSearchParams();
	const previousPathname = useRef(currentPathname);
	const initialSearchQuery = searchParams.get('query');

	const [searchQuery, setSearchQuery] = useState(initialSearchQuery ?? '');
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	useEffect(() => {
		const fallbackPath = currentPathname === '/search' ? '/' : currentPathname;
		const target = debouncedSearchQuery ? `/search?query=${debouncedSearchQuery}` : fallbackPath;
		router.push(target);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchQuery, router]);

	useEffect(() => {
		if (previousPathname.current === '/search' && currentPathname !== '/search') {
			setSearchQuery(''); // Clear search query when leaving search page
		} else if (previousPathname.current !== '/search' && currentPathname === '/search') {
			setSearchQuery(initialSearchQuery ?? ''); // Restore search query when entering search page from client navigation
		}
		previousPathname.current = currentPathname;
	}, [currentPathname, initialSearchQuery]);

	return (
		<input
			type="text"
			placeholder="Search articles"
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto focus:outline-none focus:border-primary"
			ref={ref}
		/>
	);
});
