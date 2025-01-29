import { ApiClient } from 'recombee-api-client';

export const ServerRecombeeClient = new ApiClient(
	process.env.RECOMBEE_DB_NAME!,
	process.env.RECOMBEE_DB_PRIVATE_TOKEN!,
	{ region: process.env.RECOMBEE_DB_REGION! }
);
