import { writable } from 'svelte/store';
import { dev, browser } from '$app/env';
import {
	getAuth,
	onAuthStateChanged,
	setPersistence,
	browserLocalPersistence,
	indexedDBLocalPersistence,
	browserSessionPersistence,
	inMemoryPersistence,
	connectAuthEmulator,
} from 'firebase/auth';
import { getApps } from 'firebase/app';
import { initFirebase } from './firebase';

export function userStore() {
	const storageKey = 'user';
	let cached = null;


	if (browser) {
		cached = JSON.parse(window.localStorage.getItem(storageKey));
	}

	const store = writable(cached, () => {
		if (getApps().length === 0) {
			initFirebase();
		}

		const authStatePersistence = import.meta.env.VITE_PUBLIC_FIREBASE_USER_PERSISTENCE;
		if (browser && !!authStatePersistence) {
			switch (authStatePersistence) {
				case 'local':
					setPersistence(getAuth(), browserLocalPersistence);
					break;
				case 'session':
					setPersistence(getAuth(), browserSessionPersistence);
					break;
				case 'memory':
					setPersistence(getAuth(), inMemoryPersistence);
					break;
				case 'indexed':
					setPersistence(getAuth(), indexedDBLocalPersistence);
					break;
				default:
					break;
			}
		}

		const useEmulator = !!import.meta.env.VITE_USE_FIREBASE_EMULATOR;
		if (useEmulator && dev) {
			connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099', {
				disableWarnings: true
			});
		}

		onAuthStateChanged(getAuth(), (u) => {
			if (u) {
				set(u);
				if (browser) {
					window.localStorage.setItem(storageKey, JSON.stringify(u));
				}
			} else {
				if (browser) {
					window.localStorage.removeItem(storageKey);
				}
				set(null);
			}
		});
	});

	const { subscribe, set } = store;

	return {
		subscribe
	};
}
