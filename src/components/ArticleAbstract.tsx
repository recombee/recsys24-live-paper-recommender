import { useEffect, useRef, useState } from 'react';

export const ArticleAbstract = ({ abstract }: { abstract: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const abstractRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const checkOverflow = () => {
			if (abstractRef.current) {
				const lineHeight = parseInt(window.getComputedStyle(abstractRef.current).lineHeight);
				const maxHeight = lineHeight * 5;
				setIsOverflowing(abstractRef.current.scrollHeight > maxHeight);
			}
		};
		checkOverflow();
		window.addEventListener('resize', checkOverflow);
		return () => window.removeEventListener('resize', checkOverflow);
	}, [abstract]);

	return (
		<div>
			<p
				ref={abstractRef}
				className={`text-gray-800 ${
					isOverflowing && !isExpanded
						? 'line-clamp-5 relative after:absolute after:bottom-0 after:left-0 after:h-12 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent'
						: ''
				}`}
			>
				{abstract}
			</p>
			{isOverflowing && (
				<button onClick={() => setIsExpanded(!isExpanded)} className="font-medium mt-2">
					{isExpanded ? 'See less' : 'See full text'}
				</button>
			)}
		</div>
	);
};
