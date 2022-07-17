import { browser } from '$app/env';
import type { Team } from '$lib/types/pokemon';
import { transformTeam } from '$lib/types/json';
import { writable } from 'svelte/store';
import type { Response } from '../../../../draft-websocket-server/src/server.js';

const SERVER_ADDRESS =
	import.meta.env.VITE_DRAFT_SERVER_URL || 'wss://tfl-draft-server.herokuapp.com';

const isActive = import.meta.env.VITE_IS_DRAFT_SERVER_ACTIVE || false;

export const liveTeams = writable<Team[]>([]);

const wsHandler = (message: MessageEvent) => {
	const data: Response = JSON.parse(message.data);
	switch (data.messageType) {
		case 'teamsUpdate': {
			console.log('Whole teams update received');
			liveTeams.update(() => data.data.map((team) => transformTeam(team)));
			changedPokemon.update(() => null);
			break;
		}
		case 'singlePokemon': {
			console.log('Single pokemon Update received: ', data.data.pokemon);
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

let ws: WebSocket;

const initWebSocket = () => {
	if (!ws || ws.readyState === ws.CLOSED) {
		console.log('(Re-)initializing WebSocket connection');
		ws = new WebSocket(SERVER_ADDRESS);
		ws.onmessage = wsHandler;
		ws.onclose = () => {
			console.log('Socket closed; re-opening');
			initWebSocket();
		};
	}
};

if (browser && isActive) {
	initWebSocket();
	const listener = () => initWebSocket;
	document.removeEventListener('focus', listener);
	document.addEventListener('focus', listener);
}

export const changedPokemon = writable<string | null>();
