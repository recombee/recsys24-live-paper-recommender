import { Article } from '@/actions/recommendations/getHomeArticles';
import { AuthorNames } from '@/components/AuthorNames';
import Link from 'next/link';
import { BookmarkButton } from './BookmarkButton';

export const ArticleBlock = ({ article }: { article: Article }) => {
	const recommId = article?.recommId;
	const queryString = recommId ? `?recommId=${recommId}` : '';

	return (
		<div className="border-b py-3">
			<div className="flex justify-between items-start gap-2">
				<h2 className="text-sm md:text-base font-medium">
					<Link key={article.id} href={`/article/${article.id}${queryString}`}>
						{article.title}
					</Link>
				</h2>
				<BookmarkButton articleId={article.id} recommId={recommId} />
			</div>
			<p className="text-xs md:text-sm text-gray-600">
				{article.year}
				{' · '}
				<AuthorNames authors={article.authors} />
			</p>
			<p className="text-xs md:text-sm text-gray-800 overflow-hidden whitespace-nowrap overflow-ellipsis">
				{article.abstract}
			</p>
		</div>
	);
};
