import type { RequestHandler } from '@sveltejs/kit';
import teams from '$lib/data/generated/teams.json' assert { type: 'json' };

export const GET: RequestHandler = async ({ params }) => {
	return {
		body: {
			team: teams.find((it) => it.player.toLocaleLowerCase() === params.team.toLocaleLowerCase())
		},
		status: 200,
		headers: { 'Content-Type': 'application/json', 'cache-control': 'public, max-age=3600' }
	};
};
