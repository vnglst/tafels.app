import { writable } from 'svelte/store';
import { useLocalStorage } from '$lib/store-hooks';

export interface AccountState {
	name: string;
}

const STORAGE_KEY = 'tafels-app-name';
const DEFAULT_NAME = 'BigHead';

const initialState: AccountState = {
	name: DEFAULT_NAME
};

/**
 * Creates the account store with localStorage persistence
 */
function createAccountStore() {
	const { set, subscribe, update } = writable<AccountState>(initialState);
	useLocalStorage({ subscribe, update, key: STORAGE_KEY });

	return {
		subscribe,
		set
	};
}

export const accountStore = createAccountStore();
