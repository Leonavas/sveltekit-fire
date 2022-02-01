import { writable } from 'svelte/store';
import { getFirestore, doc, collection, onSnapshot, query } from 'firebase/firestore';
import { initFirebase } from 'sveltekit-fire';
interface docOptions {
	startWith: any;
	log: boolean;
}

// Svelte Store for Firestore Document
export function docStore(path, opts: docOptions) {
	const { startWith, log, maxWait } = { maxWait: 10000, ...opts };

	initFirebase();
	// Create the Firestore Reference
	const ref = typeof path === 'string' ? doc(getFirestore(), path) : path;

	// Internal state
	let _loading = typeof startWith !== undefined;
	let _firstValue = true;
	let _error = null;
	let _teardown;
	let _waitForIt;

	// State should never change without emitting a new value
	// Clears loading state on first call
	const next = (val, err) => {
		_loading = false;
		_firstValue = false;
		_waitForIt && clearTimeout(_waitForIt);
		_error = err || null;
		set(val);
	};

	// Timout
	// Runs of first subscription
	const start = () => {
		// Timout for fallback slot
		_waitForIt =
			maxWait &&
			setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}ms.`)), maxWait);

		// Realtime firebase subscription
		_teardown = onSnapshot(
			ref,
			(snapshot) => {
				const data = snapshot.data() || (_firstValue && startWith) || null;
				if (data === null) {
					next(null, `No such document '${ref.path}'`);
				} else {
					// Optional logging
					if (log) {
						console.groupCollapsed(`Doc ${snapshot.id}`);
						console.log(`Path: ${ref.path}`);
						console.log('Snapshot:', snapshot.data());
						console.groupEnd();
					}

					// Emit next value
					next(data, null);
				}
			},

			// Handle firebase thrown errors
			(error) => {
				console.error(error);
				next(null, error);
			}
		);

		// Removes firebase listener when store completes
		return () => _teardown();
	};

	// Svelte store
	const store = writable(startWith, start);
	const { subscribe, set } = store;

	return {
		subscribe,
		ref,
		get loading() {
			return _loading;
		},
		get error() {
			return _error;
		}
	};
}

// Svelte Store for Firestore Collection
export function collectionStore(path, queryFn, opts: docOptions) {
	initFirebase();
	const { startWith, log, maxWait, idField, refField } = {
		idField: 'id',
		refField: 'ref',
		maxWait: 10000,
		...opts
	};

	let ref = typeof path === 'string' ? collection(getFirestore(), path) : path;
	if (!!queryFn) {
		ref = query(ref, ...queryFn);
	}

	let _loading = typeof startWith !== undefined;
	let _error = null;
	let _meta = {};
	let _teardown;
	let _waitForIt;

	// Metadata for result
	const calcMeta = (val) => {
		return val && val.length ? { first: val[0], last: val[val.length - 1] } : {};
	};

	const next = (val, err) => {
		_loading = false;
		_waitForIt && clearTimeout(_waitForIt);
		_error = err || null;
		_meta = calcMeta(val);
		set(val);
	};

	const start = () => {
		_waitForIt =
			maxWait &&
			setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}ms.`)), maxWait);

		_teardown = onSnapshot(
			ref,
			(snapshot) => {
				// Will always return an array
				const data = snapshot.docs.map((docSnap) => ({
					...docSnap.data(),
					// Allow end user override fields mapped for ID and Ref
					...(idField ? { [idField]: docSnap.id } : null),
					...(refField ? { [refField]: docSnap.ref } : null)
				}));

				if (log) {
					const type = _loading ? 'New Query' : 'Updated Query';
					console.groupCollapsed(`${type} ${ref.id} | ${data.length} hits`);
					console.log(`${ref.path}`);
					console.log(
						`Snapshot: `,
						snapshot.docs.map((docSnap) => ({ ...docSnap.data(), _firestoreId: docSnap.id }))
					);
					console.groupEnd();
				}
				next(data, null);
			},

			(error) => {
				console.error(error);
				next(null, error);
			}
		);

		return () => _teardown();
	};

	const store = writable(startWith, start);
	const { subscribe, set } = store;

	return {
		subscribe,
		ref,
		get loading() {
			return _loading;
		},
		get error() {
			return _error;
		},
		get meta() {
			return _meta;
		}
	};
}
