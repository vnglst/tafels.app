import { writable, type Updater } from 'svelte/store';
import { useLocalStorage } from '$lib/store-hooks';

/**
 * Account state interface containing user information
 */
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
 * @returns Svelte store with subscribe, set, and update methods
 */
function createAccountStore() {
	const { set, subscribe, update } = writable<AccountState>(initialState);
	useLocalStorage({ subscribe, update, key: STORAGE_KEY });

	return {
		subscribe,
		set,
		update
	};
}

/**
 * Account store for managing user account information
 * Persists to localStorage automatically
 */
export const accountStore = createAccountStore();
