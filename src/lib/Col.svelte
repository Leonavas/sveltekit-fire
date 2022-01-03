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

	import { query as q } from 'firebase/firestore/lite';

	import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
	import { initFirebase } from './firebase';
	import promiseTimeout from './utils';
	import { createEventDispatcher, onMount } from 'svelte';

	initFirebase();

	const dispatch = createEventDispatcher();

	let ref = null;

	try {
		if (!!startWith) {
			data = startWith;
			loading = false
		}
		ref = typeof path === 'string' ? collection(getFirestore(), path) : path;
		if (!!query) {
			ref = q(ref, ...query);
		}

		dispatch('ref', { ref: ref });

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
					data = []
					snap.docs.forEach((doc) => {
						data.push({ _firestoreId: doc.id, ...doc.data() });
					});

					dispatch('data', { data: data });
					first = data[0];
					last = data[snap.docs.length - 1];

					if (log) {
						console.groupCollapsed(`New Query | ${data.length} hits`);
						if (ref.type !== 'query') {
							console.log(`${ref.path}`);
						}
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
				throw err;
			});
	} catch (err) {
		console.error(err);
		errored = true;
		loading = false;
		error = `Error getting collection: ${err}`;
	}
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
