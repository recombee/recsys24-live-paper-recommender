'use client';

import { useYearFilter } from '@/utils/YearFilterContext';
import { useEffect, useRef, useState } from 'react';

const allYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

export const YearFilter = () => {
	const { filteredYears, setFilteredYears } = useYearFilter();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleYear = (year: number) => {
		const newFilteredYears = new Set(filteredYears);
		if (filteredYears.has(year)) {
			newFilteredYears.delete(year);
		} else {
			newFilteredYears.add(year);
		}
		setFilteredYears(newFilteredYears);
	};

	const selectAll = () => {
		setFilteredYears(new Set(allYears));
	};

	const reset = () => {
		setFilteredYears(new Set([2024]));
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<div className="relative text-left text-sm" ref={dropdownRef}>
			<div>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="inline-flex justify-between items-center rounded border border-gray-300 px-2 py-1 bg-white w-48"
				>
					<span className="truncate">
						{(filteredYears.size > 0 ? [...filteredYears] : allYears).join(', ')}
					</span>
					<svg
						className="h-4 w-4 shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						{isOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						)}
					</svg>
				</button>
			</div>

			{isOpen && (
				<div className="origin-top-right absolute w-48 rounded shadow-md bg-white border border-gray-300 border-t-0 z-10">
					<div className="max-h-60 overflow-auto">
						{allYears.map((year) => (
							<label
								key={year}
								className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 hover:cursor-pointer"
								htmlFor={`year-${year}`}
							>
								<input
									id={`year-${year}`}
									type="checkbox"
									className="form-checkbox rounded border border-gray-300"
									checked={filteredYears.has(year)}
									onChange={() => toggleYear(year)}
								/>
								{year}
							</label>
						))}
					</div>
					<div className="py-1 px-1 border-t flex justify-between items-center ">
						<button onClick={selectAll} className="px-2 py-1 hover:bg-gray-100 rounded">
							Select All
						</button>
						<button onClick={reset} className="px-2 py-1 hover:bg-gray-100 rounded">
							Reset
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
