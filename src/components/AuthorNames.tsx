import Link from 'next/link';

export const AuthorNames = ({
	authors,
	withLinks = true,
}: {
	authors: string[];
	withLinks?: boolean;
}) => {
	return authors.sort().map((author, index) => (
		<span key={author}>
			{withLinks ? (
				<Link href={`/author/${author}`} className="text-blue underline text-xs md:text-sm">
					{author}
				</Link>
			) : (
				author
			)}
			{index < authors.length - 1 && ', '}
		</span>
	));
};
