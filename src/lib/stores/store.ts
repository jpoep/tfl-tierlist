import { writable } from 'svelte/store';

export enum Language {
	DE = 'de',
	EN = 'en'
}

export const language = writable(Language.EN);

export const toggleLanguage = () => {
	language.update((language) => (language === Language.DE ? Language.EN : Language.DE));
};
