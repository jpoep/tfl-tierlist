import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const officialArtworkEnabled = writable<boolean>(
	(browser && localStorage.getItem('officialArtworkEnabled') === 'true') || false
);

if (browser) {
	officialArtworkEnabled.subscribe((value) =>
		localStorage.setItem('officialArtworkEnabled', value.toString())
	);
}
