import Link from 'next/link';

export default function NotFound() {
	return (
		<>
			<h2 className="font-bold text-lg">Not found</h2>
			<p>
				<Link href="/" className="underline">
					Go explore articles instead
				</Link>
			</p>
		</>
	);
}
