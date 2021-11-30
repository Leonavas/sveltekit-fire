<script lang="ts">
	export let path;
	export let query = null;
	export let log = false;
	export let startWith = undefined;
	export let maxWait = 10000;

	let loading = true;
	let errored = false;
	let error = null;
	let first = null;
	let last = null;
	let data = [];

	import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
	import { getApps } from 'firebase/app';
	import { initFirebase } from './firebase';
	import promiseTimeout from './utils';

	if (getApps().length === 0) {
		initFirebase();
	}

	const ref = typeof path === 'string' ? collection(getFirestore(), path) : path;

	let fetchCollection = promiseTimeout(
		maxWait,
		getDocs(ref)
			.then((snap) => {
				return snap;
			})
			.catch((err) => {
				throw err;
			})
	);

	fetchCollection
		.then((snap) => {
			if (!snap.empty) {
				snap.docs.forEach((doc) => {
					data.push({ _firestoreId: doc.id, ...doc.data() });
				});

				first = data[0];
				last = data[snap.docs.length - 1];

				if (log) {
					console.groupCollapsed(`New Query | ${data.length} hits`);
					console.log(`${ref.path}`);
					console.log(
						`Snapshot: `,
						snap.docs.map((docSnap) => ({ ...docSnap.data(), _firestoreId: docSnap.id }))
					);
					console.groupEnd();
				}
			} else {
				data = [];
			}
			loading = false;
		})
		.catch((err) => {
			errored = true;
			loading = false;
			error = `Error getting collection: ${err}`;
			console.error(err);
		});
</script>

<slot name="before" />
{#if loading}
	<slot name="loading" />
{:else if errored}
	<slot name="fallback" />
{:else}
	<slot {data} {ref} {error} {first} {last} />
{/if}
<slot name="after" />
