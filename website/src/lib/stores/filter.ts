import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const filter = writable<string>();

if (browser) {
	// sync the q searchparam with the currently active filter
	filter.subscribe((filter) => {
		const url = new URL(window.location.href);
		if (filter?.length > 0) {
			url.searchParams.set('q', filter);
		} else {
			url.searchParams.delete('q');
		}
		window.history.replaceState(null, '', url.toString());
	});
}
