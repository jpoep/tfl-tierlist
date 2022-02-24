import { browser } from '$app/env';
import { writable } from 'svelte/store';

export enum Language {
	DE = 'de',
	EN = 'en'
}

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
