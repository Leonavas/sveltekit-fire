<script lang="ts">
	export let path;
	export let log = false;
	export let maxWait = 10000;

	let loading = true;
	let errored = false;
	let error = null;
	let data = {};

	import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
	import { initFirebase } from './firebase';
	import { createEventDispatcher, onMount } from 'svelte';
	import promiseTimeout from './utils';

	initFirebase();

	const dispatch = createEventDispatcher();

	const ref = typeof path === 'string' ? doc(getFirestore(), path) : path;

	onMount(() => dispatch('ref', { ref: ref }));

	let fetchDoc = promiseTimeout(
		maxWait,
		getDoc(ref)
			.then((snap) => {
				return snap;
			})
			.catch((err) => {
				throw err;
			})
	);

	fetchDoc
		.then((snap) => {
			if (!!snap.data()) {
				data = snap.data();
				dispatch('data', { data: snap.data() });
				if (log) {
					console.groupCollapsed(`Doc ${snap.id}`);
					console.log(`Path: ${ref.path}`);
					console.log('Snapshot:', data);
					console.groupEnd();
				}
			} else {
				errored = true;
				error = `No such document '${ref.path}'`;
				console.error(error);
			}
			loading = false;
		})
		.catch((err) => {
			errored = true;
			loading = false;
			error = `Error getting document: ${err}`;
			console.error(err);
		});
</script>

<slot name="before" />
{#if loading}
	<slot name="loading" />
{:else if errored}
	<slot name="fallback" />
{:else}
	<slot {data} {error} {ref} />
{/if}
<slot name="after" />
