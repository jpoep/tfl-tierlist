import { browser } from '$app/env';
import writableDerived from 'svelte-writable-derived';
import { writable } from 'svelte/store';

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
