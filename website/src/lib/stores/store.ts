import { browser } from '$app/env';
import { writable, type Writable } from 'svelte/store';
import writableDerived from 'svelte-writable-derived';

// This file needs a lot of cleaning

export enum Language {
	DE = 'de',
	EN = 'en'
}

// language

let storedLanguage = Language.EN;
if (browser) {
	storedLanguage = <Language>localStorage.getItem('language');
}
export const language: Writable<Language> = writable(storedLanguage);

if (browser) {
	language.subscribe((value) => localStorage.setItem('language', value));
}

export const toggleLanguage = () => {
	language.update((language) => (language === Language.DE ? Language.EN : Language.DE));
};

// theme
type Theme = 'dark' | 'light';

let storedTheme: Theme | null = null;
if (browser) {
	storedTheme =
		(localStorage.getItem('theme') as Theme) ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
export const theme = writable(storedTheme);
export const darkMode = writableDerived(
	theme,
	(theme: Theme | null) => theme === 'dark',
	(dark: boolean) => (dark ? 'dark' : 'light')
);

if (browser) {
	theme.subscribe((value) => {
		if (value) {
			document.documentElement.setAttribute('data-theme', value);
			localStorage.setItem('theme', value);
		}
	});
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
		theme.set(event.matches ? 'dark' : 'light');
	});
}

// filter

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

// allStatsToggled

export const allStatsToggled = writable<boolean>(false);

// sprite preference

export const officialArtworkEnabled = writable<boolean>(
	(browser && localStorage.getItem('officialArtworkEnabled') === 'true') || false
);

if (browser) {
	officialArtworkEnabled.subscribe((value) =>
		localStorage.setItem('officialArtworkEnabled', value.toString())
	);
}
