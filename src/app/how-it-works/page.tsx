export default function HowItWorks() {
	return (
		<>
			<h1 className="text-lg font-bold mb-2">
				Unveiling the Engine Behind Personalized Recommendations
			</h1>
			<p className="mb-6">
				At Recombee, we{"'"}re showcasing the capabilities of our AI-powered recommendation platform
				through this interactive web application designed exclusively for RecSys 2024 attendees.
			</p>

			<h2 className="text-base font-bold mb-2">Explore the Features:</h2>
			<ul className="list-disc list-inside space-y-1">
				<li>
					<b className="font-bold">Comprehensive Article Database:</b> Access a curated collection
					of submissions from current and past RecSys conferences, complete with authors and
					abstracts.
				</li>
				<li>
					<b className="font-bold">Semantic Search:</b> Leverage advanced semantic search to find
					articles that align closely with your research interests and ideas.
				</li>
				<li>
					<b className="font-bold inline-block mb-1">Personalized Recommendations:</b>
					<ul className="list-disc list-inside pl-6 space-y-1">
						<li>
							<b className="font-bold">Similar Articles:</b> Discover works related to the articles
							you view.
						</li>
						<li>
							<b className="font-bold">Users Also Viewed:</b> See what others with similar interests
							are reading.
						</li>
						<li>
							<b className="font-bold">Popular Articles:</b> Stay updated with trending research in
							the community.
						</li>
					</ul>
				</li>
				<li>
					<b className="font-bold">Bookmarking:</b> Save articles for easy access later,
					contributing to a dynamic recommendation dataset.
				</li>
			</ul>

			<h2 className="text-base font-semibold mt-6 mb-2">How It Works:</h2>
			<ul className="list-disc list-inside space-y-1">
				<li>
					<b className="font-bold">Interactive Experience:</b> Simply scan the QR code to enter the
					application. A unique user ID is generated and stored locally, ensuring a personalized
					browsing experience.
				</li>
				<li>
					<b className="font-bold">Powered by Recombee:</b> The entire interface is built with React
					and seamlessly integrated with Recombee{"'"}s recommendation engine, demonstrating
					real-time personalization and recommendation strategies.
				</li>
			</ul>

			<h2 className="text-base font-semibold mt-6 mb-2">Participation Notice:</h2>
			<p>
				By using this application, you agree to participate in a research project. Your interactions
				within the app will contribute to a research dataset that may be used for future
				publications, benefiting the recommender systems community.
			</p>

			<h2 className="text-base font-semibold mt-6 mb-2">Why Recombee:</h2>
			<p>
				Experience firsthand how Recombee{"'"}s technology can transform content discovery and user
				engagement. Our platform utilizes cutting-edge machine learning algorithms to deliver
				accurate and meaningful recommendations, tailored to individual user behaviors and
				preferences.
			</p>
		</>
	);
}
