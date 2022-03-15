import { writable } from 'svelte/store';
import { dev, browser } from '$app/env';
import {
	getAuth,
	onAuthStateChanged,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
	connectAuthEmulator
} from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	where,
	query
} from 'firebase/firestore';
import { initFirebase } from './firebase';

type UserType = {
	loading?: boolean;
	displayName?: string;
	emailVerified?: boolean;
	isAnonymous?: boolean;
	metadata?: any;
	phoneNumber?: string;
	photoURL?: string;
	uid?: string;
	colData?: any;
};

export function userStore() {
	const storageKey = 'user';
	let cached: UserType = { loading: true };

	const authStatePersistence = import.meta.env.VITE_PUBLIC_FIREBASE_USER_PERSISTENCE;
	const envUserColName = import.meta.env.VITE_PUBLIC_FIREBASE_USER_COLNAME;
	const envUserColKey = import.meta.env.VITE_PUBLIC_FIREBASE_USER_COLKEY;

	const userColName: string =
		typeof envUserColName !== 'undefined' ? envUserColName.toString() : null;
	const userColKey: string = typeof envUserColKey !== 'undefined' ? envUserColKey.toString() : null;

	const firebaseAuthUseKeysToStore = [
		'displayName',
		'email',
		'emailVerified',
		'isAnonymous',
		'metadata',
		'phoneNumber',
		'photoURL',
		'uid',
		'colData'
	];

	let user;

	initFirebase();

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
		if (browser) {
			handleAuth();
		}
	});

	function handleAuth() {
		if (!!authStatePersistence) {
			switch (authStatePersistence) {
				case 'local':
					setPersistence(getAuth(), browserLocalPersistence);
					break;
				case 'session':
					setPersistence(getAuth(), browserSessionPersistence);
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

		onAuthStateChanged(getAuth(), async (u) => {
			if (u) {
				user = u;
				if (userColName === null) {
					user = mapFirebaseAuthUser(u);
				} else {
					const userInfo = await getUserDataFromCollection(u.uid);
					if (userInfo !== null) {
						user = mapFirebaseAuthUser(u);
						user['colData'] = userInfo;
					}
				}

				set(user);

				switch (authStatePersistence) {
					case 'local':
						window.localStorage.setItem(storageKey, JSON.stringify(user));
						break;
					case 'session':
						window.sessionStorage.setItem(storageKey, JSON.stringify(user));
						break;
					default:
						break;
				}
			} else {
				set(null);
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
		});
	}

	async function getUserDataFromCollection(uid) {
		const db = getFirestore();

		if (userColKey === null) {
			const docRef = doc(db, userColName, uid);
			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists) {
					return docSnap.data();
				}
			} catch (err) {
				console.error(err);
			}
		} else {
			const colRef = collection(db, userColName);
			try {
				const q = query(colRef, where(userColKey, '==', uid));
				const querySnap = await getDocs(q);
				if (querySnap.docs.length === 1) {
					const docSnap = querySnap.docs[0];
					return {...docSnap.data(), docId: docSnap.id};
				} else if (querySnap.docs.length > 1) {
					console.warn(`Expected to find user with id ${uid} but found ${querySnap.docs.length}`);
				} else {
					console.error(`Expected to find user with id ${uid} but found 0`);
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	function mapFirebaseAuthUser(firebaseUser) {
		let user = {};
		firebaseAuthUseKeysToStore.forEach((key) => {
			if (firebaseUser[key] !== undefined) {
				user[key] = firebaseUser[key];
			}
		});

		return user;
	}

	const { subscribe, set } = store;

	return {
		subscribe,
		set
	};
}
