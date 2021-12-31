import { dev, browser } from '$app/env';
import { initializeApp, getApps } from 'firebase/app';

import { initializeAnalytics } from 'firebase/analytics';
import { initializePerformance } from 'firebase/performance';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

export function initFirebase() {
	if (getApps().length === 0) {
		const env = import.meta.env;

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_API_KEY')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_API_KEY');
		}

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_AUTH_DOMAIN')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_AUTH_DOMAIN');
		}

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_DATABASE_URL')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_DATABASE_URL');
		}

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_PROJECT_ID')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_PROJECT_ID');
		}

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_STORAGE_BUCKET')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_STORAGE_BUCKET');
		}

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
		}

		if (!env.hasOwnProperty('VITE_PUBLIC_FIREBASE_APP_ID')) {
			throwMissingKeyError('VITE_PUBLIC_FIREBASE_APP_ID');
		}

		const firebaseConfig = {
			apiKey: env.VITE_PUBLIC_FIREBASE_API_KEY.toString(),
			authDomain: env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN.toString(),
			databaseURL: env.VITE_PUBLIC_FIREBASE_DATABASE_URL.toString(),
			projectId: env.VITE_PUBLIC_FIREBASE_PROJECT_ID.toString(),
			storageBucket: env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET.toString(),
			messagingSenderId: env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID.toString(),
			appId: env.VITE_PUBLIC_FIREBASE_APP_ID.toString()
			//measurementId: env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID || null
		};

		const firebaseApp = initializeApp(firebaseConfig);
		if (browser) {
			const useAnalytics = !!env.VITE_PUBLIC_FIREBASE_USE_ANALYTICS;
			const usePerformance = !!env.VITE_PUBLIC_FIREBASE_USE_PERFORMANCE;
			if (useAnalytics && !dev) {
				initializeAnalytics(firebaseApp);
			}

			if (usePerformance && !dev) {
				initializePerformance(firebaseApp);
			}
		}

		const useEmulator = !!import.meta.env.VITE_PUBLIC_FIREBASE_USE_EMULATOR;
		if (useEmulator && dev) {
			try {
				connectFirestoreEmulator(getFirestore(firebaseApp), '127.0.0.1', 8080);
				connectFunctionsEmulator(getFunctions(firebaseApp), 'localhost', 5001);
			} catch (err) {
				console.error('Error connecting to firebase emulator');
				console.error(err);
			}
		}
	}

	function throwMissingKeyError(key) {
		throw new Error(`${key} at .env file is not defined`);
	}
}
