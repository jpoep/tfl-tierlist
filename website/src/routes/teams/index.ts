import type { RequestHandler } from '@sveltejs/kit';
import teams from '$lib/data/generated/teams.json';

export const GET: RequestHandler = async () => {
	return {
		body: {
			teams
		},
		status: 200,
		headers: { 'Content-Type': 'application/json', 'cache-control': 'public, max-age=3600' }
	};
};
