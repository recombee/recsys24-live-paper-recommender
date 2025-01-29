import { YearFilter } from '@/components/YearFilter';

export default function FilterLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="mb-4 flex items-center gap-2">
				<span className="text-sm">Selected years</span>
				<YearFilter />
			</div>
			{children}
		</>
	);
}
