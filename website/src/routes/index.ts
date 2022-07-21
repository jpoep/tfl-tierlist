import type { RequestHandler } from '@sveltejs/kit';
import tierlist from '$lib/data/generated/tierlist.json';
import teams from '../../data/teams.json' assert { type: 'json' };

import { transformTeam } from '$lib/types/json.js';

export const GET: RequestHandler = async ({ url }) => {
	return {
		body: {
			tierlist,
			teams: teams.teams.map(transformTeam),
		},
		status: 200,
		headers: { 'Content-Type': 'application/json', 'cache-control': 'public, max-age=3600' }
	};
};
