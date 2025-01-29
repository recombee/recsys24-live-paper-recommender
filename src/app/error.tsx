'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2 className="font-bold">Something went wrong!</h2>
			<button onClick={() => reset()} className="underline">
				Try again
			</button>
		</div>
	);
}
