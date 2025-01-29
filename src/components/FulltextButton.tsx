import Image from 'next/image';
import { ReactNode } from 'react';

export enum ArticleSource {
	ACM = 'ACM',
	GOOGLE_SCHOLAR = 'SCHOLAR',
}

const getLinkBySource = (source: ArticleSource, articleTitle: string) => {
	return {
		[ArticleSource.ACM]: `https://dl.acm.org/action/doSearch?AllField=${articleTitle}`,
		[ArticleSource.GOOGLE_SCHOLAR]: `https://scholar.google.com/scholar?q=${articleTitle}`,
	}[source];
};

const SourceLogoMap: Record<ArticleSource, ReactNode> = {
	[ArticleSource.ACM]: (
		<Image src="/acm.png" alt="DL ACM Logo" width={167} height={42} className="w-auto h-8" />
	),
	[ArticleSource.GOOGLE_SCHOLAR]: (
		<Image src="/scholar.png" alt="DL ACM Logo" width={762} height={128} className="w-auto h-6" />
	),
};

export const FulltextButton = ({
	articleTitle,
	source,
}: {
	articleTitle: string;
	source: ArticleSource;
}) => {
	return (
		<a href={getLinkBySource(source, articleTitle)} target="_blank" rel="noopener noreferrer">
			{SourceLogoMap[source]}
		</a>
	);
};
