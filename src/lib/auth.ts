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
	connectAuthEmulator
} from 'firebase/auth';
import { initFirebase } from './firebase';

export function userStore() {
	const storageKey = 'user';
	let cached = null;

	const authStatePersistence = import.meta.env.VITE_PUBLIC_FIREBASE_USER_PERSISTENCE;

	if (browser && !!authStatePersistence) {
		switch (authStatePersistence) {
			case 'local':
				cached = JSON.parse(window.localStorage.getItem(storageKey));
				break;
			case 'session':
				cached = JSON.parse(window.sessionStorage.getItem(storageKey));
				break;
			default:
				break;
		}
	}

	const store = writable(cached, () => {
		initFirebase();

		if (browser && !!authStatePersistence) {
			switch (authStatePersistence) {
				case 'local':
					setPersistence(getAuth(), browserLocalPersistence);
					break;
				case 'session':
					setPersistence(getAuth(), browserSessionPersistence);
					break;
				// case 'memory':
				// 	setPersistence(getAuth(), inMemoryPersistence);
				// 	break;				// case 'memory':
				// 	setPersistence(getAuth(), inMemoryPersistence);
				// 	break;
				// case 'indexed':
				// 	setPersistence(getAuth(), indexedDBLocalPersistence);
				// 	break;
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
				if (browser && !!authStatePersistence) {
					switch (authStatePersistence) {
						case 'local':
							window.localStorage.setItem(storageKey, JSON.stringify(u));
							break;
						case 'session':
							window.sessionStorage.setItem(storageKey, JSON.stringify(u));
							break;
						default:
							break;
					}
				}
			} else {
				if (browser) {
					switch (authStatePersistence) {
						case 'local':
							window.localStorage.removeItem(storageKey);
							break;
						case 'session':
							window.sessionStorage.removeItem(storageKey);
							break;
						default:
							break;
					}
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
