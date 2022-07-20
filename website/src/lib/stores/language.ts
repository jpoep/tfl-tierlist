import { browser } from "$app/env";
import { type Writable, writable } from "svelte/store";

export enum Language {
	DE = 'de',
	EN = 'en'
}

// language

let storedLanguage = Language.EN;
if (browser) {
	storedLanguage = <Language>localStorage.getItem('language') || Language.EN;
	// fix for a nasty bug that caused 'null' to be stored in the language
	if ((storedLanguage as string) !== 'de' || (storedLanguage as string) !== 'en') {
		storedLanguage = Language.EN;
	}
}

export const language: Writable<Language> = writable(storedLanguage);

if (browser) {
	language.subscribe((value) => localStorage.setItem('language', value));
}

export const toggleLanguage = () => {
	language.update((language) => (language === Language.DE ? Language.EN : Language.DE));
};