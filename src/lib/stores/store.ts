import { browser } from '$app/env';
import { writable } from 'svelte/store';
import writableDerived from 'svelte-writable-derived';

// This file needs a lot of cleaning

export enum Language {
	DE = 'de',
	EN = 'en'
}

// language

let storedLanguage: string = Language.EN;
if (browser) {
	storedLanguage = localStorage.getItem('language');
}
export const language = writable(storedLanguage || Language.EN);

if (browser) {
	language.subscribe((value) => localStorage.setItem('language', value));
}

export const toggleLanguage = () => {
	language.update((language) => (language === Language.DE ? Language.EN : Language.DE));
};

// theme
type Theme = 'dark' | 'light';

let storedTheme: Theme;
if (browser) {
	storedTheme =
		(localStorage.getItem('theme') as Theme) ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
export const theme = writable(storedTheme);
export const darkMode = writableDerived(
	theme,
	(theme: Theme) => theme === 'dark',
	(dark: boolean) => (dark ? 'dark' : 'light')
);

if (browser) {
	theme.subscribe((value) => {
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem('theme', value);
	});
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
		theme.set(event.matches ? 'dark' : 'light');
	});
}
