import { browser } from '$app/env';
import type { Team } from '$lib/types/pokemon';
import { transformTeam } from '$lib/types/json';
import { writable } from 'svelte/store';
import type { Response } from '../../../../draft-websocket-server/src/server.js';

const SERVER_ADDRESS =
	import.meta.env.VITE_DRAFT_SERVER_URL || 'ws://tfl-draft-server.herokuapp.com';

export const liveTeams = writable<Team[]>([]);

if (browser) {
	console.log('Initializing WebSocket connection');
	const ws = new WebSocket(SERVER_ADDRESS);
	ws.onmessage = (message) => {
		console.log('new message yay');
		const data: Response = JSON.parse(message.data);
		switch (data.messageType) {
			case 'teamsUpdate': {
				console.log(data.data);
				liveTeams.update(() => data.data.map((team) => transformTeam(team)));
				break;
			}
			case 'singlePokemon': {
				liveTeams.update((teams) => {
					const team = teams.find(
						(it) =>
							it.name.toLowerCase() === data.data.name?.toLowerCase() ||
							it.player.toLowerCase() === data.data.player?.toLowerCase()
					);
					if (!team) {
						return teams;
					}
					team?.pokemon.push(data.data.pokemon);
					return [...teams.filter((it) => it.name !== team?.name), team];
				});
				changedPokemon.update(() => data.data.pokemon);
				break;
			}
		}
	};
}

export const changedPokemon = writable<string>();
