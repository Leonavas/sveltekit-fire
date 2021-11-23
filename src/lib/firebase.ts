import { dev, browser } from '$app/env';
import { initializeApp, getApps } from 'firebase/app';

import { initializeAnalytics } from 'firebase/analytics';
import { initializePerformance } from 'firebase/performance';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

export function initFirebase() {
	let firebaseApp = null;

	if (getApps().length === 0) {
		const env = import.meta.env;
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

		firebaseApp = initializeApp(firebaseConfig);
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

		const useEmulator = !!import.meta.env.VITE_USE_FIREBASE_EMULATOR;
		if (useEmulator && dev) {
			connectFirestoreEmulator(getFirestore(), '127.0.0.1', 8080);
			connectFunctionsEmulator(getFunctions(), '127.0.0.1', 5001);
		}
	}
}

