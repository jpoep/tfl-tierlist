import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const officialArtworkEnabled = writable<boolean>(
	(browser && localStorage.getItem('officialArtworkEnabled') === 'true') || true
);

if (browser) {
	officialArtworkEnabled.subscribe((value) =>
		localStorage.setItem('officialArtworkEnabled', value.toString())
	);
}
