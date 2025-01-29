'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import { useBookmarks } from '@/utils/BookmarksContext';

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const { bookmarks } = useBookmarks();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		setIsSearchOpen(false);
	};

	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
		setIsMenuOpen(false);
	};

	useEffect(() => {
		if (isSearchOpen) {
			searchInputRef.current?.focus();
		}
	}, [isSearchOpen]);

	return (
		<div className="container border-b bg-white/50 backdrop-blur-sm sticky top-0 left-0 right-0 p-4 mx-auto z-50">
			<div className="bg-primary-light text-primary-text backdrop-blur py-2 px-4 shadow-md rounded flex flex-col">
				<div className="flex flex-row-reverse md:flex-row items-center justify-between md:gap-4">
					<div className="text-base font-medium gap-4 items-center flex">
						<button className="w-8 h-8 flex items-center justify-center" onClick={toggleSearch}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
						<div className="hidden md:flex gap-4">
							<Link href="/trending" className="hover:underline">
								Trending
							</Link>
							{bookmarks && (
								<Link href="/bookmarks" className="hover:underline">
									Bookmarks
								</Link>
							)}
							<Link href="/how-it-works" className="hover:underline">
								How it works
							</Link>
						</div>
					</div>

					<Link href="/" className="hover:underline font-bold">
						Explore RecSys{"'"}24
					</Link>

					<div className="flex md:hidden">
						<button
							className="w-8 h-8 flex flex-col justify-center items-center"
							onClick={toggleMenu}
						>
							<span
								className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
									isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
								}`}
							></span>
							<span
								className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
									isMenuOpen ? 'opacity-0' : 'opacity-100'
								}`}
							></span>
							<span
								className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
									isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
								}`}
							></span>
						</button>
					</div>
					<div className="hidden mt-4 md:mt-0 md:flex items-center gap-4">
						<a href="https://recsys.acm.org/recsys24/" target="_blank" rel="noopener noreferrer">
							<Image
								src="/recsys-blue.png"
								alt="RecSys Logo"
								width={4000}
								height={1394}
								className="w-auto h-7"
							/>
						</a>
						<a
							href="https://www.recombee.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs"
						>
							Powered by
							<br />
							<Image
								src="/recombee.svg"
								alt="Recombee Logo"
								className="inline-block h-4 w-auto"
								width={193}
								height={32}
							/>
						</a>
					</div>
				</div>
				<div className={`${isSearchOpen ? 'flex' : 'hidden'} mt-4 md:mt-2`}>
					<SearchInput ref={searchInputRef} />
				</div>
				{isMenuOpen && (
					<nav className="md:hidden text-base font-medium flex flex-col gap-2 items-center mt-4">
						<Link href="/trending" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
							Trending
						</Link>
						{bookmarks && (
							<Link
								href="/bookmarks"
								className="hover:underline"
								onClick={() => setIsMenuOpen(false)}
							>
								Bookmarks
							</Link>
						)}
						<Link
							href="/how-it-works"
							className="hover:underline"
							onClick={() => setIsMenuOpen(false)}
						>
							How it works
						</Link>
						<div className="mt-4 flex items-center gap-6">
							<a href="https://recsys.acm.org/recsys24/" target="_blank" rel="noopener noreferrer">
								<Image
									src="/recsys-blue.png"
									alt="RecSys Logo"
									width={4000}
									height={1394}
									className="w-auto h-7"
								/>
							</a>
							<a
								href="https://www.recombee.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs w-[100px]"
							>
								Powered by
								<br />
								<Image
									src="/recombee.svg"
									alt="Recombee"
									className="inline-block h-4 w-auto"
									width={193}
									height={32}
								/>
							</a>
						</div>
					</nav>
				)}
			</div>
		</div>
	);
};
